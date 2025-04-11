import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useReadContract } from "thirdweb/react";

import CommentLikeDropDown from "./CommentLikeDropDown";
import { useAppContext } from "../context/AppProvider";
import { contract as SocialPostContract } from "../utils/contract/socialpost";

const IndivisualComment = ({ comment, id, index, profileUserId }) => {
  const { likeComment } = useAppContext();

  const [isHeartClicked, setHeartClicked] = useState(false);
  const [heartNumber, setHeartNumber] = useState(0);
  const [isUserLike, setIsUserLike] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Function to like a comment
  const commentLike = () => {
    setHeartClicked(!isHeartClicked);
    if (heartNumber === 0) {
      likeComment(Number(id), index);
    }
    setHeartNumber(heartNumber + 1);
  };

  // Function to maintain the like of a comment
  const { data: isLike, isPending: isLikePending } = useReadContract({
    contract: SocialPostContract,
    method:
      "function commentLikes(uint256, uint256, address) view returns (bool)",
    params: [Number(id), index, profileUserId],
    queryOptions: { enabled: id !== null && profileUserId !== "" },
  });
  useEffect(() => {
    if (isLike && !isLikePending) {
      setIsUserLike(isLike);
    }
  }, [isLike, isLikePending]);

  const profileLoadingPicture = () => {
    setProfileLoading(false);
  };

  return (
    <article
      className={`p-6 pb-3 text-base bg-base-100 rounded-lg border-1 border-base-300 w-64 sm:w-110 md:w-125`}
    >
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3">
            <div
              role="button"
              className="btn btn-ghost btn-circle avatar overflow-hidden w-10 h-10 mr-4 hover:outline-2"
            >
              {profileLoading == true && (
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              )}
              <img
                className={`object-cover w-full h-full rounded-full ${
                  profileLoading == true ? "hidden" : ""
                }`}
                src={comment.userImage}
                alt={comment.userName}
                onLoad={profileLoadingPicture}
              />
            </div>
            <p className="text-md font-semibold font-secondary">
              {comment.userName}
            </p>
          </div>
          <p className="font-secondary font-light text-gray-500 text-xs">
            {comment.date}
          </p>
        </div>
      </footer>
      {/* Explicit left alignment for the comment text */}
      <p className="text-left font-tertiary text-sm">{comment.text}</p>
      <div className="flex items-center mt-2 space-x-4">
        <span className="flex flex-row gap-1 items-center">
          <span
            className="hover:cursor-pointer hover:border-1 hover:border-base-100"
            onClick={() => {
              setHeartClicked(!isHeartClicked);
            }}
          >
            <div
              className="flex flex-row items-center gap-1"
              onClick={commentLike}
            >
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
          <CommentLikeDropDown
            postId={id}
            likeCnt={Number(comment.likeCount)}
            commentId={index}
          />
        </span>
      </div>
    </article>
  );
};

export default IndivisualComment;
