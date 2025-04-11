import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PeopleProfile = ({ name, role, location, image, userAddress }) => {
  const navigate = useNavigate();

  const [profileLoading, setProfileLoading] = useState(true);

  const goToPage = () => {
    navigate(`/profile/${userAddress}`);
  };

  const profileLoadingSet = () => {
    setProfileLoading(false);
  };
  return (
    <div className="flex flex-col justify-center py-3 px-3 rounded-xl border-2 border-base-300 object-cover w-full">
      <div className="flex items-center justify-center gap-4">
        <div
          role="button"
          className="btn btn-ghost btn-circle avatar w-40 h-40 overflow-hidden hover:outline-2"
        >
          {profileLoading == true && (
            <div className="skeleton h-full w-full shrink-0 rounded-full"></div>
          )}
          <img
            className={`object-cover w-full h-full rounded-full ${
              profileLoading == true ? "hidden" : ""
            } `}
            alt={name}
            src={image}
            onLoad={profileLoadingSet}
            onClick={goToPage}
          />
        </div>
      </div>

      <div className="my-2 space-y-1 text-center">
        <h2 className="text-xl font-semibold font-secondary">{name}</h2>
        <p className="px-5 text-sm font-secondary">{role}</p>
        <p className="px-5 text-xs font-secondary font-light">{location}</p>
      </div>
      <div className="flex justify-center border-t-2 border-base-300 pt-2">
        <button
          className="btn btn-primary font-secondary rounded-md"
          onClick={goToPage}
        >
          Visit Profile
        </button>
      </div>
    </div>
  );
};

export default PeopleProfile;
