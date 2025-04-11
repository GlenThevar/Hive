import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { useAppContext } from "../context/AppProvider";

const Donate = ({ postId }) => {
  const { donate, theme } = useAppContext();

  const [newCommentText, setNewCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let notificationBg = theme == "black" ? "#333" : "#FFF";
  let notificationTextColor = theme == "black" ? "#FFF" : "#333";

  const donate_notification = () =>
    toast.success("Successfully Sent!", {
      style: { background: notificationBg, color: notificationTextColor },
    });

  const Donate = async () => {
    try {
      setIsLoading(true);
      await donate(postId, newCommentText);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      donate_notification();
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <AttachMoneyOutlinedIcon
        onClick={() =>
          document.getElementById(`donate_modal_${postId}`).showModal()
        }
        className="hover:cursor-pointer hover:border-1 hover:border-base-100"
      />
      <dialog id={`donate_modal_${postId}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-lg btn-circle absolute right-2 top-2 bg-base-100 shadow-none border-0">
              <CloseIcon />
            </button>
          </form>
          <h3 className="font-bold font-secondary text-lg">
            Enter the amount of ETH to donate
          </h3>
          <div>
            <div>
              <div className="w-full max-w-lg p-2">
                <div className="border-2 border-base-300 rounded-lg p-3 flex items-center space-x-2 bg-base-100">
                  <input
                    type="text"
                    className="flex-1 border-none text-base-content placeholder-base-content/50 focus:outline-none focus:ring-0"
                    placeholder="0.05"
                    value={newCommentText}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^\d*\.?\d*$/.test(value)) {
                        setNewCommentText(value);
                      }
                    }}
                  />

                  <div className="tooltip ">
                    <div className="tooltip-content rounded-sm absolute ">
                      <div className="animate-bounce text-orange-400 -rotate-10 text-xl font-black ">
                        Donate!
                      </div>
                    </div>
                    <button
                      className=" btn btn-primary btn-sm rounded-lg font-secondary"
                      onClick={Donate}
                    >
                      {isLoading ? (
                        <span className="loading loading-infinity loading-xl"></span>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Donate;
