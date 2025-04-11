import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "thirdweb/react";

import { convertToLikeCount } from "../data/likeData";
import { contract as SocialPostContract } from "../utils/contract/socialpost";

const LikeDropDown = ({ likeCnt, id }) => {
  const navigate = useNavigate();

  const [likeData, setLikeData] = useState([]);
  const [postLikeData, setPostLikeData] = useState([]);

  useEffect(() => {
    if (postLikeData.length === 3) {
      setLikeData(convertToLikeCount(postLikeData));
    }
  }, [postLikeData]);

  // Function to get post likes
  const { data: postLikeDt, isPending: isPostLikeDtPending } = useReadContract({
    contract: SocialPostContract,
    method:
      "function getPostLikes(uint256 _postId) view returns (string[], string[], address[])",
    params: [id],
    queryOptions: { enabled: id !== null },
  });
  useEffect(() => {
    if (postLikeDt && !isPostLikeDtPending) {
      setPostLikeData(postLikeDt);
    }
  }, [postLikeDt, isPostLikeDtPending]);

  return (
    <div>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-base-100 p-0 text-xs border-0 font-secondary font-medium mr-1"
        >
          {likeCnt}
        </div>
        <ul
          tabIndex={0}
          className={`menu dropdown-content bg-base-200 rounded-box border-1 border-base-300 w-50 p-1 shadow-xs overflow-x-hidden flex flex-row rounded-md  ${
            likeData.length > 0 && likeData.length <= 1 && "h-20"
          } ${likeData.length == 0 && "hidden"} ${
            likeData.length > 1 && "h-40"
          }`}
        >
          {likeData.map((Like) => (
            <li key={Like.id} className="w-full p-2 hover:">
              <div
                className="flex items-center gap-4 rounded-md"
                onClick={() => {
                  navigate(`/profile/${Like.address}`);
                }}
              >
                <div
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-9 h-9 overflow-hidden hover:outline-2"
                >
                  <img
                    className="object-cover w-full h-full rounded-full "
                    alt="Profile"
                    src={Like.profilePhoto}
                  />
                </div>
                <h2 className="font-secondary text-md font-medium text-left">
                  {Like.name}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LikeDropDown;
