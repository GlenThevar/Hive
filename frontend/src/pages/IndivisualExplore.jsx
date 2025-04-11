import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadContract } from "thirdweb/react";

import PostCard from "../components/PostCard";
import Grid from "../components/Grid";
import { contract as SocialPostContract } from "../utils/contract/socialpost";
import { contract as SocialProfileContract } from "../utils/contract/socialprofile";
import { FormatDateNow } from "../utils/format/date";
import { useAppContext } from "../context/AppProvider";

const IndivisualExplore = () => {
  const { id } = useParams();
  const { MyAddress } = useAppContext();

  const [post, setPost] = useState({});
  const [profilePhoto, setProfilePhoto] = useState("");

  // Getting Indivisual Post from the id
  const { data: postData, isPending: isPostDataPending } = useReadContract({
    contract: SocialPostContract,
    method:
      "function getPostById(uint256 _postId) view returns ((address user, uint256 postId, string userName, string caption, string cidPostPicture, uint256 date, uint256 likeCount, uint256 totalDonations, address[] CommentUser, string[] CommentUserName, uint256[] CommentDate, string[] CommentText, uint256[] CommentLikeCount))",
    params: [id],
  });
  useEffect(() => {
    if (postData && !isPostDataPending) {
      setPost(postData);
    }
  }, [postData, isPostDataPending]);

  console.log(post);

  // Getting the profile photo
  const { data: ProfilePhotoData, isPending: isProfilePhotoDataPending } =
    useReadContract({
      contract: SocialProfileContract,
      method: "function profilePhoto(address _user) view returns (string)",
      params: [post.user],
    });
  useEffect(() => {
    if ((ProfilePhotoData, !isProfilePhotoDataPending)) {
      setProfilePhoto(ProfilePhotoData);
    }
  }, [ProfilePhotoData, isProfilePhotoDataPending]);

  console.log(profilePhoto);

  return (
    <div className="bg-base-100 min-h-screen place-items-center">
      <div className="hero-content justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl border-b-1 border-base-300 pb-0 ">
        <PostCard
          profilePhoto={profilePhoto}
          username={post.userName}
          caption={post.caption}
          postImage={post.cidPostPicture}
          PostDate={FormatDateNow(post.date)}
          likeCount={post.likeCount}
          postId={id}
          profileUserId={MyAddress}
          commentUserName={post.CommentUserName}
          commentUserAddress={post.CommentUser}
          commentDate={post.CommentDate}
          commentText={post.CommentText}
          commentLikeCount={post.CommentLikeCount}
          postUserAddress={post.user}
        />
      </div>
      <Grid />
    </div>
  );
};

export default IndivisualExplore;
