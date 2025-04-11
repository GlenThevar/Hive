import React, { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useAppContext } from "../context/AppProvider";
import { contract as SocialPostContract } from "../utils/contract/socialpost";
import { FormatDateNow } from "../utils/format/date";

const Home = () => {
  const { MyAddress } = useAppContext();
  const [home, sethome] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userProfilePictures, setuserProfilePictures] = useState([]);

  // Function to read home data
  const { data: homeData, isPending: isHomeDataPending } = useReadContract({
    contract: SocialPostContract,
    method:
      "function getHome(address _address) view returns ((address user, uint256 postId, string userName, string caption, string cidPostPicture, uint256 date, uint256 likeCount, uint256 totalDonations, address[] CommentUser, string[] CommentUserName, uint256[] CommentDate, string[] CommentText, uint256[] CommentLikeCount)[])",
    params: [MyAddress],
  });
  useEffect(() => {
    if (homeData && !isHomeDataPending) {
      sethome(homeData);
    }
  }, [homeData, isHomeDataPending]);

  useEffect(() => {
    if (home.length > 0) {
      const userAdd = home.map((post) => post.user);
      setUserAddress(userAdd);
    }
  }, [home]);

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

  console.log(home);

  return (
    <div className="bg-base-100 min-h-screen place-items-center">
      <div className="hero-content justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl ">
        <div className="">
          <CreatePost />
          {home.map((home, index) => (
            <PostCard
              key={index}
              profilePhoto={userProfilePictures[index]}
              username={home.userName}
              caption={home.caption}
              postImage={home.cidPostPicture}
              PostDate={FormatDateNow(home.date)}
              likeCount={home.likeCount}
              postId={home.postId}
              profileUserId={MyAddress}
              commentUserName={home.CommentUserName}
              commentUserAddress={home.CommentUser}
              commentDate={home.CommentDate}
              commentText={home.CommentText}
              commentLikeCount={home.CommentLikeCount}
              postUserAddress={home.user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
