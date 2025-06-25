import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useReadContract } from "thirdweb/react";

import Comment from "./Comment";
import Donate from "./Donate";
import LikeDropDown from "./LikeDropDown";
import { useAppContext } from "../context/AppProvider";
import { contract as SocialPostContract } from "../utils/contract/socialpost";

const PostCard = ({
  profilePhoto,
  username,
  caption,
  postImage,
  PostDate,
  likeCount,
  postId,
  profileUserId,
  postUserAddress,
  commentUserAddress,
  commentUserName,
  commentDate,
  commentText,
  commentLikeCount,
}) => {
  const {
    likePost,
    folderName,
    addPostToFolder,
    theme,
    MyAddress,
    MyProfileDt,
  } = useAppContext();

  const navigate = useNavigate();

  const [isHeartClicked, setHeartClicked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [heartNumber, setHeartNumber] = useState(0);
  const [isUserLike, setIsUserLike] = useState(false);
  const [isUserSave, setIsUserSave] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  let notificationBg = theme == "black" ? "#333" : "#FFF";
  let notificationTextColor = theme == "black" ? "#FFF" : "#333";

  const imageExists = Boolean(postImage);

  const save_notification = () =>
    toast.success("Successfully Saved!", {
      style: { background: notificationBg, color: notificationTextColor },
    });
  const error_notification = () =>
    toast.error("Update profile to interact", {
      style: { background: notificationBg, color: notificationTextColor },
    });

  const handleSelectChange = (e) => {
    setSelectedFolder(e.target.value);
  };

  const heartClick = () => {
    if (MyProfileDt.name == "") {
      error_notification();
    } else {
      setHeartClicked(!isHeartClicked);
      if (heartNumber === 0) {
        likePost(Number(postId));
      }
      setHeartNumber(heartNumber + 1);
    }
  };

  // Function to maintain the post like of a user
  const { data: IsLike, isPending: isLikePending } = useReadContract({
    contract: SocialPostContract,
    method: "function postLikes(uint256, address) view returns (bool)",
    params: [postId, profileUserId],
    queryOptions: { enabled: postId !== null && profileUserId !== "" },
  });
  useEffect(() => {
    if (IsLike && !isLikePending) {
      setIsUserLike(IsLike);
    }
  }, [IsLike, isLikePending]);

  // Function to add post to a saved folder
  const savePost = async () => {
    try {
      await addPostToFolder(selectedFolder, postId);
    } catch (errror) {
      console.log(errror);
    } finally {
      save_notification();
    }
  };

  // Function to maintain the saved icon
  const { data: isUserSaveData, isPending: isUserSaveDataPending } =
    useReadContract({
      contract: SocialPostContract,
      method:
        "function hasUserSavedPostReplacement(address, uint256) view returns (bool)",
      params: [MyAddress, postId],
    });
  useEffect(() => {
    if (isUserSaveData && !isUserSaveDataPending) {
      setIsUserSave(isUserSaveData);
    }
  }, [isUserSaveData, isUserSaveDataPending]);

  // Function to navigate
  const goToPage = () => {
    navigate(`/profile/${postUserAddress}`);
  };

  // Function to load the data
  const loadPhoto = () => {
    setPostLoading(false);
  };

  const loadProfile = () => {
    setProfileLoading(false);
  };

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={true} />
      <div className={`card md:card-side shadow-sm bg-base-100`}>
        {imageExists && (
          <figure className="md:w-60 lg:w-80">
            {postLoading == true && (
              <div className="skeleton h-full w-full"></div>
            )}
            <img
              src={
                "https://white-deliberate-walrus-82.mypinata.cloud/ipfs/" +
                postImage
              }
              alt="Post"
              className={`w-full object-cover rounded-l-md ${
                postLoading == true ? "hidden" : ""
              }`}
              onLoad={loadPhoto}
            />
          </figure>
        )}

        <div
          className={`md:w-70 lg:w-90 card-body rounded-r-md border-t-2 border-r-2 border-base-300 border-l-2 md:border-l-0 ${
            showComments ? "" : "border-b-2"
          }
          ${
            imageExists
              ? ""
              : "border-base-300 border-l-2 rounded-l-md md:border-l-2"
          }
          `}
        >
          <div className="flex items-start gap-4">
            <div
              role="button"
              className="btn btn-ghost btn-circle avatar w-14 h-14 overflow-hidden hover:outline-2"
            >
              {profileLoading == true && (
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              )}
              <img
                className={`object-cover w-full h-full rounded-full ${
                  profileLoading == true ? "hidden" : ""
                }`}
                alt="Profile"
                src={profilePhoto}
                onClick={goToPage}
                onLoad={loadProfile}
              />
            </div>

            <div className="flex flex-col">
              <h2 className="card-title font-secondary">{username}</h2>
              <p className=" font-tertiary text-justify">{caption}</p>
              <p className="text-left font-secondary font-light text-xs mt-3 text-gray-500 ">
                {PostDate}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 mt-3 pl-4">
            <span className="flex flex-row items-center gap-1 hover:cursor-pointer hover:border-1 hover:border-base-100">
              <span onClick={heartClick}>
                <div className="flex flex-row items-center">
                  {isUserLike ? (
                    <FavoriteIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
                  ) : heartNumber <= 1 ? (
                    isHeartClicked ? (
                      <FavoriteIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
                    ) : (
                      <FavoriteBorderOutlinedIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
                    )
                  ) : (
                    <FavoriteIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
                  )}
                </div>
              </span>
              <div>
                <LikeDropDown likeCnt={Number(likeCount)} id={Number(postId)} />
              </div>
            </span>

            <span>
              {isUserSave ? (
                <BookmarkIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
              ) : (
                <BookmarkBorderOutlinedIcon
                  className="hover:cursor-pointer hover:border-1 hover:border-base-100"
                  onClick={() => {
                    if (MyProfileDt.name == "") {
                      error_notification();
                    } else {
                      document.getElementById(`my_modal_${postId}`).showModal();
                    }
                  }}
                />
              )}
            </span>
            <span
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              {showComments ? (
                <CommentIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
              ) : (
                <CommentOutlinedIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
              )}
            </span>
            <Donate postId={Number(postId)} />
          </div>
        </div>
      </div>
      <dialog id={`my_modal_${postId}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                console.log(postId);
              }}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="font-bold font-secondary text-lg">
              Select the saved folder
            </h3>

            <div className="flex flex-row gap-2 items-center justify-center">
              <div>
                <select
                  value={selectedFolder}
                  onChange={handleSelectChange}
                  className="select select-primary focus:outline-none"
                >
                  <option disabled value="">
                    Select the saved folder
                  </option>
                  {folderName.map((folder, index) => (
                    <option key={index} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              </div>
              <form method="dialog">
                <div className="tooltip ">
                  <div className="tooltip-content rounded-sm absolute ">
                    <div className="animate-bounce text-orange-400 -rotate-10 text-xl font-black ">
                      Save!
                    </div>
                  </div>
                  <button
                    className=" btn btn-primary btn-md rounded-md font-secondary"
                    onClick={savePost}
                    disabled={!selectedFolder}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      <div className="card lg:card-side bg-base-100 shadow-sm mb-5 ">
        {showComments && (
          <div className="card-body rounded-md pt-0 outline-2 outline-base-300 ">
            <Comment
              profileUserId={profileUserId}
              id={postId}
              commentDate={commentDate}
              commentLikeCount={commentLikeCount}
              commentText={commentText}
              commentUserName={commentUserName}
              commentUserAddress={commentUserAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
