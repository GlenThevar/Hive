import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";

import PostCard from "../components/PostCard";
import { contract as SocialPostContract } from "../utils/contract/socialpost";
import { FormatDateNow } from "../utils/format/date";
import { useAppContext } from "../context/AppProvider";

const SavedPreview = () => {
  const { foldername } = useParams();
  const { MyAddress } = useAppContext();

  const [savedData, setSavedData] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userProfilePictures, setuserProfilePictures] = useState([]);

  // Function to read post within folder
  const { data: SavedFolderData, isPending: isSavedFolderDataPending } =
    useReadContract({
      contract: SocialPostContract,
      method:
        "function getPostsInFolderReplacement(string _folderName, address _address) view returns ((address user, uint256 postId, string userName, string caption, string cidPostPicture, uint256 date, uint256 likeCount, uint256 totalDonations, address[] CommentUser, string[] CommentUserName, uint256[] CommentDate, string[] CommentText, uint256[] CommentLikeCount)[])",
      params: [foldername, MyAddress],
    });
  useEffect(() => {
    if (SavedFolderData && !isSavedFolderDataPending) {
      setSavedData(SavedFolderData);
    }
  }, [SavedFolderData, isSavedFolderDataPending]);

  useEffect(() => {
    if (savedData.length > 0) {
      const userAdd = savedData.map((post) => post.user);
      setUserAddress(userAdd);
    }
  }, [savedData]);

  // Function to get the profile picture for each post
  const { data: userAddressData, isPending: isUserAddressDataPending } =
    useReadContract({
      contract: SocialPostContract,
      method:
        "function getProfilePictures(address[] users) view returns (string[])",
      params: [userAddress],
    });
  useEffect(() => {
    if (userAddressData && !isUserAddressDataPending) {
      setuserProfilePictures(userAddressData);
    }
  }, [userAddressData, isUserAddressDataPending]);

  return (
    <div className="bg-base-100 min-h-screen place-items-center">
      <div className="hero-content justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl ">
        <div className="">
          {savedData.map((post, index) => (
            <PostCard
              key={index}
              profilePhoto={userProfilePictures[index]} //
              username={post.userName}
              caption={post.caption}
              postImage={post.cidPostPicture}
              PostDate={FormatDateNow(post.date)}
              likeCount={post.likeCount}
              postId={post.postId}
              profileUserId={post.user}
              commentUserName={post.CommentUserName}
              commentUserAddress={post.CommentUser}
              commentDate={post.CommentDate}
              commentText={post.CommentText}
              commentLikeCount={post.CommentLikeCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedPreview;
