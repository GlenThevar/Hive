import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useReadContract } from "thirdweb/react";

import CommentList from "./CommentList";
import { convertToLikeCount } from "../data/commentData";
import { useAppContext } from "../context/AppProvider";
import { contract as SocialPostContract } from "../utils/contract/socialpost";

const Comment = ({
  profileUserId,
  id,
  commentUserAddress,
  commentUserName,
  commentDate,
  commentText,
  commentLikeCount,
}) => {
  const { comment, MyAddress, theme, MyProfileDt } = useAppContext();

  let notificationBg = theme == "black" ? "#333" : "#FFF";
  let notificationTextColor = theme == "black" ? "#FFF" : "#333";

  // State for storing comments
  const [commentsData, setCommentsData] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [commenterProfilePic, setcommenterProfilePic] = useState([]);

  // Function to read the comment users cid
  const {
    data: CommentersProfilePicture,
    isPending: isCommentersProfilePicturePending,
  } = useReadContract({
    contract: SocialPostContract,
    method:
      "function getCommentersProfilePhotos(uint256 _postId) view returns (string[])",
    params: [id],
  });
  useEffect(() => {
    if (CommentersProfilePicture && !isCommentersProfilePicturePending) {
      setcommenterProfilePic(CommentersProfilePicture);
    }
  }, [CommentersProfilePicture, isCommentersProfilePicturePending]);

  useEffect(() => {
    setCommentsData(
      convertToLikeCount(
        commentUserAddress,
        commentUserName,
        commentDate,
        commentText,
        commentLikeCount,
        commenterProfilePic
      )
    );
  }, [
    commentUserAddress,
    commentUserName,
    commentDate,
    commentText,
    commentLikeCount,
    commenterProfilePic,
  ]);

  // Comment Notification
  const comment_notification = () =>
    toast.success("Successfully Commented", {
      style: { background: notificationBg, color: notificationTextColor },
    });
  const error_notification = () =>
    toast.error("Update profile to interact", {
      style: { background: notificationBg, color: notificationTextColor },
    });

  // Handle the comment submission
  const handleSubmit = async () => {
    if (MyProfileDt.name == "") {
      error_notification();
    } else {
      try {
        setLoading(true);
        if (newCommentText.trim() === "") return;
        await comment(id, MyAddress, Date.now(), newCommentText.trim());
        comment_notification();
      } catch (error) {
        console.log(error);
      } finally {
        setNewCommentText("");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <CommentList
        comments={commentsData}
        id={id}
        profileUserId={profileUserId}
      />
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-full max-w-lg p-2">
        <div className="border-2 border-base-300 rounded-lg p-3 flex flex-col space-y-2 bg-base-100">
          <textarea
            className="w-full resize-none border-none text-base-content placeholder-base-content/50 focus:outline-none focus:ring-0 font-tertiary bg-base-200 rounded-lg p-2"
            rows="2"
            placeholder="Comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <div className="flex items-center justify-end ">
            <div className="tooltip ">
              <div className="tooltip-content rounded-sm absolute ">
                <div className="animate-bounce text-orange-400 -rotate-10 text-xl font-black ">
                  Loading!
                </div>
              </div>
              <button
                className=" btn btn-primary btn-sm rounded-lg font-secondary"
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="loading loading-infinity loading-xl"></span>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
