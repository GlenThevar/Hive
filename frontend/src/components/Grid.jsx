import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "thirdweb/react";

import { useAppContext } from "../context/AppProvider";
import { contract as SocialPostContract } from "../utils/contract/socialpost";

const Grid = () => {
  const navigate = useNavigate();
  const { explorePage } = useAppContext();

  const [userAddress, setUserAddress] = useState([]);
  const [userProfilePictures, setuserProfilePictures] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [pictureLoading, setPictureLoading] = useState(true);

  useEffect(() => {
    if (explorePage.length > 0) {
      const userAdd = explorePage.map((post) => post.user);
      setUserAddress(userAdd);
    }
  }, [explorePage]);

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

  const postLoadingSet = () => {
    setPostLoading(false);
  };
  const pictureLoadingSet = () => {
    setPictureLoading(false);
  };

  return (
    <div>
      <section className="">
        <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
          {explorePage.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-full rounded-md shadow-sm min-h-48 border-2 border-base-300"
            >
              {postLoading == true && (
                <div className="skeleton h-full w-full"></div>
              )}
              <img
                alt=""
                className={`w-full h-full object-cover rounded-sm  ${
                  postLoading == true ? "hidden" : ""
                }`}
                src={`https://white-deliberate-walrus-82.mypinata.cloud/ipfs/${item.cidPostPicture}`}
                onClick={() => navigate(`/explore/${Number(item.postId)}`)}
                onLoad={postLoadingSet}
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-2 ">
                <div
                  onClick={() => {
                    navigate(`/profile/${item.user}`);
                  }}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-14 h-14 overflow-hidden hover:outline-2 border-0"
                >
                  {pictureLoading == true && (
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                  )}
                  <img
                    className={`object-cover w-full h-full rounded-full border-0 ${
                      pictureLoading == true ? "hidden" : ""
                    }}`}
                    onLoad={pictureLoadingSet}
                    alt="Profile"
                    src={userProfilePictures[index]}
                  />
                </div>
                <p className="text-white text-lg font-secondary font-bold">
                  {item.userName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Grid;
