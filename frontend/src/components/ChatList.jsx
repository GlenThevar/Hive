import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "thirdweb/react";

import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import { contract as SocialMessageContract } from "../utils/contract/socialmessage";
import { useAppContext } from "../context/AppProvider";

const ChatList = () => {
  const navigate = useNavigate();
  const { MyAddress } = useAppContext();
  const [chatlist, setChatList] = useState([]);
  const [chatProfile, setChatProfile] = useState(true);

  // Function to get the chat list
  const { data: chatListData, isPending: isChatListDataPending } =
    useReadContract({
      contract: SocialMessageContract,
      method:
        "function getChatList(address _sender) view returns (address[], string[], string[], string[], uint256[])",
      params: [MyAddress],
    });
  useEffect(() => {
    if (chatListData && !isChatListDataPending) {
      const [Addresses, UserName, ProfilePhoto, RecentText, Notification] =
        chatListData;
      const formattedMessages = Addresses.map((add, index) => ({
        Address: add,
        UserName: UserName[index],
        ProfilePhoto: ProfilePhoto[index],
        RecentText: RecentText[index],
        Notification: Number(Notification[index]),
      }));
      setChatList(formattedMessages);
    }
  }, [chatListData, isChatListDataPending]);
  console.log(chatlist);

  const ChatProfileLoadSet = () => {
    setChatProfile(false);
  };

  return (
    <div className="">
      <ul className="pr-3 list bg-base-100 rounded-box border-2 border-base-300 w-80 sm:w-sm md:w-md lg:w-lg xl:w-2xl h-180 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
        <li className="p-4 pb-2 text-xl tracking-wide font-secondary font-bold">
          Chats
        </li>
        {chatlist.map((chat) => (
          <li
            key={chat.id}
            className="list-row hover:cursor-pointer"
            onClick={() => {
              navigate(`/chat/${chat.Address}`);
            }}
          >
            <div className="flex items-center gap-4">
              <div
                role="button"
                className="btn btn-ghost btn-circle avatar w-14 h-14 overflow-hidden hover:outline-2"
              >
                {chatProfile && (
                  <div className="skeleton h-full w-full shrink-0 rounded-full"></div>
                )}
                <img
                  className={`object-cover w-full h-full rounded-full ${
                    chatProfile == true ? "hidden" : ""
                  }`}
                  alt="Profile"
                  src={chat.ProfilePhoto}
                  onLoad={ChatProfileLoadSet}
                />
              </div>

              <div className="flex flex-col">
                <h2 className="font-secondary text-md font-medium text-left">
                  {chat.UserName}
                </h2>
                <h2 className="font-tertiary text-sm font-light text-left text-gray-500">
                  {chat.RecentText}
                </h2>
              </div>
            </div>
            <div className="flex items-center justify-end">
              {chat.Notification > 0 ? (
                <>
                  <div className="indicator">
                    {/* <span className="indicator-item badge badge-primary rounded-full text-sm p-2"></span> */}
                    <button className="btn btn-ghost btn-circle bg-base-100 border-0 ">
                      <NotificationsActiveOutlinedIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
                    </button>
                  </div>
                </>
              ) : (
                <NotificationsActiveOutlinedIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
