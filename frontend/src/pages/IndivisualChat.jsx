import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadContract } from "thirdweb/react";

import { useAppContext } from "../context/AppProvider";
import { contract as SocialMessageContract } from "../utils/contract/socialmessage";
import { contract as SocialProfileContract } from "../utils/contract/socialprofile";
import { FormatDateNow } from "../utils/format/date";

const IndivisualChat = () => {
  const { chatId } = useParams();
  const { sendMessageToUser, wait, MyAddress } = useAppContext();

  const [Isloading, setIsloading] = useState(false);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [profileUsername, setProfileUsername] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // console.log(input);

  // Function to send a post
  const sendPost = async () => {
    try {
      setIsloading(true);
      await sendMessageToUser(chatId, input);
      await wait(3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
      setInput("");
    }
  };

  // Function to get your profile username
  const { data: myProfileUsername, isPending: isMyProfileUsernamePending } =
    useReadContract({
      contract: SocialProfileContract,
      method:
        "function YourProfileUsername(address _user) view returns (string)",
      params: [MyAddress],
    });
  useEffect(() => {
    if (myProfileUsername && !isMyProfileUsernamePending) {
      setProfileUsername(myProfileUsername);
    }
  }, [myProfileUsername, isMyProfileUsernamePending]);

  // Function to get the Indivisual chat
  const { data: chatDataFunction, isPending: isChatDataFunctionPending } =
    useReadContract({
      contract: SocialMessageContract,
      method:
        "function getIndividualChat(address _receiver, address _sender) view returns (string[] texts, uint256[] dates, bool[] status, string[] senderUsernames, string[] receiverUsernames, string senderProfilePicture, string recieverProfilePicture)",
      params: [chatId, MyAddress],
    });
  useEffect(() => {
    if (chatDataFunction && !isChatDataFunctionPending) {
      const [
        texts,
        dates,
        status,
        senderUsernames,
        receiverUsernames,
        senderProfilePicture,
        receiverProfilePicture,
      ] = chatDataFunction;

      console.log(chatDataFunction);

      const formattedMessages = texts.map((text, index) => ({
        text,
        date: FormatDateNow(dates[index]),
        // isSeen: "",
        sender: senderUsernames[index],
        receiver: receiverUsernames[index],
        sendersAvatar:
          profileUsername === senderUsernames[index]
            ? senderProfilePicture
            : receiverProfilePicture,
        position:
          profileUsername === senderUsernames[index]
            ? "chat-end"
            : "chat-start",
      }));
      setChats(formattedMessages);
    }
  }, [chatDataFunction, isChatDataFunctionPending, profileUsername]);

  const ProfileLoadingState = () => {
    setProfileLoading(false);
  };

  return (
    <div className="bg-base-100 min-h-screen place-items-center">
      <div className="hero-content justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl overflow-y-auto">
        <div className="w-full border-2 border-base-300 rounded-md p-5 h-180 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {chats.map((chat, index) => (
              <div key={index} className={`chat ${chat.position}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    {profileLoading && (
                      <div className="skeleton h-full w-full shrink-0 rounded-full"></div>
                    )}
                    <img
                      alt={`Avatar ${profileLoading == true ? "hiden" : ""}`}
                      src={chat.sendersAvatar}
                      onLoad={ProfileLoadingState}
                    />
                  </div>
                </div>
                <div className="chat-header font-secondary">
                  {chat.sender}
                  <time className="text-xs opacity-50 font-secondary">
                    {chat.date}
                  </time>
                </div>
                <div className="chat-bubble font-tertiary text-sm">
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center p-2 border-t border-base-300">
            <input
              value={input}
              type="text"
              onChange={handleChange}
              placeholder="Type a message..."
              className="w-full p-2 rounded-lg outline-1 outline-base-300 font-tertiary"
            />
            <button
              className="btn btn-primary px-4 py-2 rounded-md ml-2 font-secondary"
              onClick={sendPost}
            >
              {Isloading ? (
                <span className="loading loading-infinity loading-xl"></span>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndivisualChat;
