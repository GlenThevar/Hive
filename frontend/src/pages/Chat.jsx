import React from "react";
import ChatList from "../components/ChatList";

const chat = () => {
  return (
    <div className="bg-base-100 min-h-screen place-items-center overflow-hidden">
      <div className="hero-content justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl overflow-y-auto">
        <ChatList />
      </div>
    </div>
  );
};

export default chat;



