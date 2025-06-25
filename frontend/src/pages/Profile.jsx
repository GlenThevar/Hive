import React from "react";
import { useParams } from "react-router-dom";

import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import { useAppContext } from "../context/AppProvider";
import { FormatDateNow } from "../utils/format/date";

const Profile = () => {
  const { UserProfile, postDt } = useAppContext();

  const { userId } = useParams();

  return (
    <div>
      <ProfileCard profileUserId={userId} />
      <div className="bg-base-100 min-h-screen place-items-center">
        <div className="justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl ">
          <div>
            {postDt && postDt.length > 0 ? (
              postDt.map((post, index) => (
                <PostCard
                  key={index}
                  profilePhoto={UserProfile.cid_profilephoto}
                  username={UserProfile.name}
                  caption={post.caption}
                  postImage={post.cidPostPicture}
                  PostDate={FormatDateNow(post.date)}
                  likeCount={post.likeCount}
                  postId={post.postId}
                  profileUserId={userId}
                  commentUserName={post.CommentUserName}
                  commentUserAddress={post.CommentUser}
                  commentDate={post.CommentDate}
                  commentText={post.CommentText}
                  commentLikeCount={post.CommentLikeCount}
                  postUserAddress={postDt.user}
                />
              ))
            ) : (
              <p className="font-tertiary">No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
