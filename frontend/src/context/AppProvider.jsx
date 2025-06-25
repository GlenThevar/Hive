import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { useSendTransaction, useAutoConnect } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";

import { contract as SocialProfileContract } from "../utils/contract/socialprofile";
import { contract as SocialPostContract } from "../utils/contract/socialpost";
import { contract as SocialMessageContract } from "../utils/contract/socialmessage";

import { client } from "../utils/login/client";
import { wallets } from "../utils/login/wallet";
import { pinata } from "../utils/pinata/config";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { mutate: sendTransaction } = useSendTransaction();
  const activeAccount = useActiveAccount();
  const [ProfileAddress, setProfileAddress] = useState("");
  const [postDt, setPostDt] = useState([]);
  const [theme, setTheme] = useState(() => {
    const val = sessionStorage.getItem("theme");
    return val ? val : "black";
  });
  const [themeWallet, setthemeWallet] = useState("dark");
  const [folderName, setFolderName] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersAddress, setAllUsersAddress] = useState([]);
  const [explorePage, setExplorePage] = useState([]);
  const [LoggedIn, SetLoggedIn] = useState(false);
  const [UserProfile, setUserProfile] = useState({
    name: "",
    profession: "",
    city: "",
    followers: 0,
    following: 0,
    totalpost: 0,
    cid_profilephoto:
      "https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg",
    cid_bannerphoto:
      "https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg",
  });
  const [MyProfileDt, setMyProfileDt] = useState({
    name: "",
    profession: "",
    city: "",
  });

  // To Auto Connect on Page reload
  const { data: autoConnected, isLoading } = useAutoConnect({
    client,
    wallets,
  });

  useEffect(() => {
    if (autoConnected && !isLoading) {
      SetLoggedIn(true);
    }
  }, [autoConnected, isLoading]);

  const MyAddress = activeAccount?.address;

  // Function to update the theme
  const updateTheme = () => {
    setTheme(theme === "lofi" ? "black" : "lofi");
  };
  useEffect(() => {
    if (theme == "lofi") {
      setthemeWallet("light");
    } else {
      setthemeWallet("dark");
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Function to edit the profile
  const editProfileFunction = async (
    _username,
    _jobDescription,
    _location,
    _profileFileList,
    _bannerFileList
  ) => {
    try {
      let _cidProfilePhoto =
        "https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg";
      let _cidBannerPhoto =
        "https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg";

      if (_profileFileList.length != 0) {
        let profileFile = _profileFileList[0].originFileObj;
        const ProfileUpload = await pinata.upload.public.file(profileFile);
        console.log("Upload successful:", ProfileUpload);
        _cidProfilePhoto =
          "https://white-deliberate-walrus-82.mypinata.cloud/ipfs/" +
          ProfileUpload.cid;
      }
      if (_bannerFileList.length != 0) {
        let bannerFile = _bannerFileList[0].originFileObj;
        const BannerUpload = await pinata.upload.public.file(bannerFile);
        console.log("Upload successful:", BannerUpload);
        _cidBannerPhoto =
          "https://white-deliberate-walrus-82.mypinata.cloud/ipfs/" +
          BannerUpload.cid;
      }

      const transaction = prepareContractCall({
        contract: SocialProfileContract,
        method:
          "function updateProfile(string _username, string _jobDescription, string _location, string _cidProfilePhoto, string _cidBannerPhoto)",
        params: [
          _username,
          _jobDescription,
          _location,
          _cidProfilePhoto,
          _cidBannerPhoto,
        ],
      });
      sendTransaction(transaction);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Function to set the adress
  const setAddress = (_userAddress) => {
    setProfileAddress(_userAddress);
  };

  // Read user profile data function
  const { data: profileData, isPending: isProfileDataPending } =
    useReadContract({
      contract: SocialProfileContract,
      method:
        "function getUserProfile(address _userAddress) view returns ((string username, string jobDescription, string location, string cidProfilePhoto, string cidBannerPhoto, uint256 followers, uint256 following, uint256 totalPosts))",
      params: [ProfileAddress],
      queryOptions: { enabled: ProfileAddress !== "" },
    });
  useEffect(() => {
    if (profileData && !isProfileDataPending) {
      setUserProfile({
        name: profileData.username,
        profession: profileData.jobDescription,
        city: profileData.location,
        followers: profileData.followers,
        following: profileData.following,
        totalpost: profileData.totalPosts,
        cid_profilephoto: profileData.cidProfilePhoto,
        cid_bannerphoto: profileData.cidBannerPhoto,
      });
    }
  }, [profileData, isProfileDataPending]);

  const { data: MyProfileData, isPending: isMyProfileDataPending } =
    useReadContract({
      contract: SocialProfileContract,
      method:
        "function getUserProfile(address _userAddress) view returns ((string username, string jobDescription, string location, string cidProfilePhoto, string cidBannerPhoto, uint256 followers, uint256 following, uint256 totalPosts))",
      params: [MyAddress],
      queryOptions: { enabled: MyAddress !== "" },
    });
  useEffect(() => {
    if (MyProfileData && !isMyProfileDataPending) {
      setMyProfileDt({
        name: MyProfileData.username,
        profession: MyProfileData.jobDescription,
        city: MyProfileData.location,
      });
    }
  }, [MyProfileData, isMyProfileDataPending]);

  // Function to read the user posts
  const { data: postData, isPending: isPostDataPending } = useReadContract({
    contract: SocialPostContract,
    method:
      "function getPostsByUser(address _user) view returns ((address user, uint256 postId, string userName, string caption, string cidPostPicture, uint256 date, uint256 likeCount, uint256 totalDonations, address[] CommentUser, string[] CommentUserName, uint256[] CommentDate, string[] CommentText, uint256[] CommentLikeCount)[])",
    params: [ProfileAddress],
    queryOptions: { enabled: ProfileAddress !== "" },
  });
  useEffect(() => {
    if (postData && !isPostDataPending) {
      setPostDt(postData);
    }
  }, [postData, isPostDataPending]);

  // Function to follow a user - haven't checked
  const followUser = (_userToFollow) => {
    const transaction = prepareContractCall({
      contract: SocialProfileContract,
      method: "function followUser(address _userToFollow)",
      params: [_userToFollow],
    });
    sendTransaction(transaction);
  };

  // Function to like a post
  const likePost = (_id) => {
    const transaction = prepareContractCall({
      contract: SocialPostContract,
      method: "function PostLike(uint256 _id)",
      params: [_id],
    });
    sendTransaction(transaction);
  };

  // Function to comment on a post
  const comment = (_id, _CommentUser, _CommentDate, _CommentText) => {
    const transaction = prepareContractCall({
      contract: SocialPostContract,
      method:
        "function Comment(uint256 _id, address _CommentUser, uint256 _CommentDate, string _CommentText)",
      params: [_id, _CommentUser, _CommentDate, _CommentText],
    });
    sendTransaction(transaction);
  };

  // Function to like on a comment
  const likeComment = (_id, _commentId) => {
    const transaction = prepareContractCall({
      contract: SocialPostContract,
      method: "function CommentLike(uint256 _id, uint256 _commentId)",
      params: [_id, _commentId],
    });
    sendTransaction(transaction);
  };

  // Function to create a post
  const createPost = async (_user, _caption, _date, fileList) => {
    let _cidPostPicture = "";
    if (fileList.length != 0) {
      let file = fileList[0].originFileObj;
      const upload = await pinata.upload.public.file(file);
      console.log("Upload successful:", upload);
      _cidPostPicture = upload.cid;
    }
    const transaction = prepareContractCall({
      contract: SocialPostContract,
      method:
        "function createPost(address _user, string _caption, string _cidPostPicture, uint256 _date)",
      params: [_user, _caption, _cidPostPicture, _date],
    });
    sendTransaction(transaction);
  };

  // Function to create a saved folder
  const createSavedFolder = (_folderName) => {
    const transaction = prepareContractCall({
      contract: SocialPostContract,
      method:
        "function createFolderReplacement(string _folderName, address _userAddress)",
      params: [_folderName, MyAddress],
    });
    sendTransaction(transaction);
  };

  // Function to return the folders
  const { data: folderNameData, isPending: isfolderNameDataPending } =
    useReadContract({
      contract: SocialPostContract,
      method:
        "function getAllFoldersReplacement(address _userAddress) view returns (string[])",
      params: [MyAddress],
    });
  useEffect(() => {
    if (folderNameData && !isfolderNameDataPending) {
      setFolderName(folderNameData);
    }
  }, [folderNameData, isfolderNameDataPending]);

  // Function to add post to a specific folder
  const addPostToFolder = (_folderName, _postId) => {
    const transaction = prepareContractCall({
      contract: SocialPostContract,
      method:
        "function savePostToFolderReplacement(string _folderName, uint256 _postId, address _userAddress)",
      params: [_folderName, _postId, MyAddress],
    });
    sendTransaction(transaction);
  };

  // Function to wait for a few seconds
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to get all the users
  const { data: allUsersData, isPending: isAllUsersDataPending } =
    useReadContract({
      contract: SocialProfileContract,
      method:
        "function getAllUsers() view returns ((string username, string jobDescription, string location, string cidProfilePhoto, string cidBannerPhoto, uint256 followers, uint256 following, uint256 totalPosts)[])",
      params: [],
    });
  useEffect(() => {
    if (allUsersData && !isAllUsersDataPending) {
      setAllUsers(allUsersData);
    }
  }, [allUsersData, isAllUsersDataPending]);

  // Function to get all User Addresses
  const { data: allUserAddressData, isPending: isAllUserAddressDataPending } =
    useReadContract({
      contract: SocialProfileContract,
      method: "function getAllUserAddresses() view returns (address[])",
      params: [],
    });
  useEffect(() => {
    if (allUserAddressData && !isAllUserAddressDataPending) {
      setAllUsersAddress(allUserAddressData);
    }
  }, [allUserAddressData, isAllUserAddressDataPending]);

  // Function to get the explore page
  const { data: explorePageData, isPending: isExplorePageDataPending } =
    useReadContract({
      contract: SocialPostContract,
      method:
        "function getExplorePage() view returns ((address user, uint256 postId, string userName, string caption, string cidPostPicture, uint256 date, uint256 likeCount, uint256 totalDonations, address[] CommentUser, string[] CommentUserName, uint256[] CommentDate, string[] CommentText, uint256[] CommentLikeCount)[])",
      params: [],
    });
  useEffect(() => {
    if (explorePageData && !isExplorePageDataPending) {
      setExplorePage(explorePageData);
    }
  }, [explorePageData, isExplorePageDataPending]);

  // Function to donate to a post
  const donate = (postId, ethamount) => {
    try {
      const transaction = prepareContractCall({
        contract: SocialPostContract,
        method: "function donateToPost(uint256 _id) payable",
        params: [postId],
        value: toWei(ethamount),
      });
      sendTransaction(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to send a message
  const sendMessageToUser = (userAddress, text) => {
    const transaction = prepareContractCall({
      contract: SocialMessageContract,
      method:
        "function sendMessage(address _sender, address _receiver, uint256 _date, string _text)",
      params: [MyAddress, userAddress, Date.now(), text],
    });
    sendTransaction(transaction);
  };

  const markMessageAsSeen = (_receiver) => {
    const transaction = prepareContractCall({
      contract: SocialMessageContract,
      method: "function markMessagesAsSeen(address _receiver, address _sender)",
      params: [_receiver, MyAddress],
    });
    sendTransaction(transaction);
  };

  return (
    <AppContext.Provider
      value={{
        editProfileFunction,
        setAddress,
        UserProfile,
        postDt,
        updateTheme,
        theme,
        themeWallet,
        followUser,
        likePost,
        comment,
        MyAddress,
        likeComment,
        createPost,
        createSavedFolder,
        folderName,
        addPostToFolder,
        wait,
        allUsers,
        allUsersAddress,
        explorePage,
        donate,
        sendMessageToUser,
        markMessageAsSeen,
        SetLoggedIn,
        LoggedIn,
        autoConnected,
        MyProfileDt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
