import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "thirdweb/react";

import UploadAnt from "./UploadAnt";
import { useAppContext } from "../context/AppProvider";
import { contract as SocialProfileContract } from "../utils/contract/socialprofile";

const ProfileCard = ({ profileUserId }) => {
  const {
    editProfileFunction,
    setAddress,
    UserProfile,
    theme,
    followUser,
    MyAddress,
  } = useAppContext();
  const navigate = useNavigate();

  const edit = false;
  let notificationBg = theme == "black" ? "#333" : "#FFF";
  let notificationTextColor = theme == "black" ? "#FFF" : "#333";
  const MyProfile = profileUserId === MyAddress ? true : false;

  const [profileFileList, setProfileFileList] = useState([]);
  const [bannerFileList, setBannerFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [editedProfile, setEditedProfile] = useState({
    name: "User name",
    profession: "Profession",
    city: "City",
    followers: 0,
    following: 0,
    totalpost: 0,
    cid_profilephoto: "",
    cid_bannerphoto: "",
  });

  const update_notification = () =>
    toast.success("Successfully Edited!", {
      style: { background: notificationBg, color: notificationTextColor },
    });
  const follow_notification = () =>
    toast.success("Followed", {
      style: { background: notificationBg, color: notificationTextColor },
    });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const editProfile = async () => {
    setIsLoading(true);

    try {
      const _username = editedProfile.name;
      const _jobDescription = editedProfile.profession;
      const _location = editedProfile.city;

      await editProfileFunction(
        _username,
        _jobDescription,
        _location,
        profileFileList,
        bannerFileList
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
      update_notification();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const goToPage = () => {
    navigate(`/chat/${profileUserId}`);
  };

  const follow = async () => {
    try {
      await followUser(profileUserId);
    } catch (error) {
      console.log(error);
    } finally {
      follow_notification();
    }
  };

  const ProfileLoadingSet = () => {
    setProfileLoading(false);
  };

  setAddress(profileUserId);

  const { data: isFollowerData, isPending: isFollowerDataPending } =
    useReadContract({
      contract: SocialProfileContract,
      method:
        "function checkFollower(address _user, address _msgsender) view returns (bool)",
      params: [MyAddress, profileUserId],
    });
  useEffect(() => {
    if (isFollowerData && !isFollowerDataPending) {
      setFollowed(isFollowerData);
    }
  }, [isFollowerData, isFollowerDataPending]);

  console.log(followed);

  return (
    <>
      <div className="h-full bg-base-100 px-5 pt-3">
        <div
          className={`bg-base-100 rounded-xl pb-5 relative ${
            isEditing ? "border-2 border-base-300 mb-5" : ""
          }`}
        >
          <Toaster position="top-center" reverseOrder={true} />
          <div className="w-full h-[250px]">
            {isEditing ? (
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex flex-col items-center">
                  <UploadAnt setFileList={setBannerFileList} edit={edit} />{" "}
                  <span className="mt-2 text-sm font-secondary">Banner</span>
                </div>
                <div className="flex flex-col items-center">
                  <UploadAnt setFileList={setProfileFileList} edit={edit} />{" "}
                  <span className="mt-2 text-sm font-secondary">
                    Profile Photo
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={UserProfile.cid_bannerphoto}
                  className="w-full h-full rounded-tl-lg rounded-tr-lg "
                  alt="background"
                />
              </div>
            )}
          </div>
          <div
            className={`rounded-lg ${
              isEditing ? "" : "border-x-2 border-b-2 border-base-300"
            }`}
          >
            <div className="flex flex-col items-center -mt-20">
              {!isEditing && (
                <div className="w-40 h-40 border-4 border-white rounded-full relative ">
                  {profileLoading && (
                    <div className="skeleton h-full w-full shrink-0 rounded-full"></div>
                  )}
                  <img
                    src={UserProfile.cid_profilephoto}
                    className={`w-full h-full rounded-full ${
                      profileLoading == true ? "hidden" : ""
                    }`}
                    alt="profile"
                    onLoad={ProfileLoadingSet}
                  />
                </div>
              )}
              <div className="flex flex-col items-center space-y-2 mt-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={editedProfile.name}
                      onChange={handleChange}
                      className="input input-primary outline-0 hover:outline-0 not-hover:outline-0 border-base-300"
                    />
                    <input
                      type="text"
                      name="profession"
                      placeholder="Profession"
                      value={editedProfile.profession}
                      onChange={handleChange}
                      className="input input-primary outline-0 hover:outline-0 not-hover:outline-0 border-base-300"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={editedProfile.city}
                      onChange={handleChange}
                      className="input input-primary outline-0 hover:outline-0 not-hover:outline-0 border-base-300"
                    />
                  </>
                ) : (
                  <div className=" text-center">
                    <p className="text-2xl font-secondary font-bold">
                      {UserProfile.name}
                    </p>
                    <p className="font-tertiary">{UserProfile.profession}</p>
                    <p className="text-sm font-tertiary">{UserProfile.city}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-8 my-5">
              <div className="flex space-x-2 mt-5">
                {isEditing ? (
                  <>
                    <button
                      onClick={editProfile}
                      className="btn btn-primary rounded font-secondary"
                      disabled={editedProfile.name === ""}
                    >
                      {isLoading ? (
                        <span className="loading loading-infinity loading-xl"></span>
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      className="btn btn-primary rounded font-secondary"
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-2">
                      <div className="stats border-1 border-base-300 w-60 md:w-100">
                        <div className="stat place-items-center">
                          <div className="stat-title font-secondary">
                            Followers
                          </div>
                          <div className="stat-value font-secondary">
                            {UserProfile.followers}
                          </div>
                        </div>
                        <div className="stat place-items-center">
                          <div className="stat-title font-secondary">
                            Following
                          </div>
                          <div className="stat-value font-secondary">
                            {UserProfile.following}
                          </div>
                        </div>
                        <div className="stat place-items-center">
                          <div className="stat-title font-secondary">Posts</div>
                          <div className="stat-value font-secondary">
                            {UserProfile.totalpost}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row text-center justify-center space-x-4 mt-2">
                        <button
                          onClick={handleEditClick}
                          className="btn btn-primary rounded font-secondary"
                        >
                          Edit
                        </button>
                        {/* {!MyProfile && (
                          <button
                            className="btn btn-neutral rounded font-secondary"
                            onClick={follow}
                          >
                            {followed ? "Following" : "Follow"}
                          </button>
                        )} */}

                        {!MyProfile ? (
                          followed ? (
                            <button className="btn btn-neutral rounded font-secondary">
                              Following
                            </button>
                          ) : (
                            <button
                              className="btn btn-neutral rounded font-secondary"
                              onClick={follow}
                            >
                              Follow
                            </button>
                          )
                        ) : (
                          ""
                        )}

                        {!MyProfile && (
                          <button
                            className="btn btn-neutral rounded font-secondary"
                            onClick={goToPage}
                          >
                            Chat
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
