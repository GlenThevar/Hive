import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import { useAppContext } from "../context/AppProvider";

const FolderAdd = ({ folders }) => {
  const navigate = useNavigate();

  return (
    <div className="hero-content justify-center text-center w-xs sm:w-lg md:w-2xl lg:w-2xl xl:w-3xl mt-15">
      {folders.length === 0 ? (
        <p className=" text-lg font-semibold font-tertiary">Add folders</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {folders.map((name, index) => (
            <div
              key={index}
              className="hover:cursor-pointer transition delay-150 duration-400 ease-in-out hover:scale-105"
              onClick={() => navigate(`/saved/${name}`)}
            >
              <div className="stack stack-top size-40">
                <div className="border-base-content card bg-base-100 border items-center justify-center rounded-md">
                  <FolderIcon fontSize="large" />
                </div>
                <div className="border-base-content card bg-base-100 border text-center rounded-md">
                  <div className="card-body"></div>
                </div>
                <div className="border-base-content card bg-base-100 border text-center rounded-md">
                  <div className="card-body"></div>
                </div>
              </div>
              <p className="text-center font-tertiary font-bold">{name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Saved = () => {
  const { createSavedFolder, folderName, MyProfileDt, theme } = useAppContext();

  const [isFolderClick, setFolderClick] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [folderNm, setFolderNm] = useState("");

  let notificationBg = theme == "black" ? "#333" : "#FFF";
  let notificationTextColor = theme == "black" ? "#FFF" : "#333";

  const addFolder = async () => {
    if (folderNm.trim()) {
      try {
        setIsLoading(true);

        await createSavedFolder(folderNm);
      } catch (error) {
        console.log(error);
      } finally {
        setFolderNm("");
        document.getElementById("my_modal_3").close();
        setIsLoading(false);
      }
    }
  };
  const error_notification = () =>
    toast.error("Update profile to interact", {
      style: { background: notificationBg, color: notificationTextColor },
    });

  return (
    <div className="bg-base-100 min-h-screen place-items-center relative p-4">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="absolute right-1 top-2">
        <button
          className="btn btn-ghost hover:bg-base-100 border-0"
          onClick={() => {
            if (MyProfileDt.name == "") {
              error_notification();
            } else {
              document.getElementById("my_modal_3").showModal();
            }
          }}
        >
          <span onClick={() => setFolderClick(!isFolderClick)}>
            {isFolderClick ? (
              <CreateNewFolderIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
            ) : (
              <CreateNewFolderOutlinedIcon className="hover:cursor-pointer hover:border-1 hover:border-base-100" />
            )}
          </span>
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mt-5 flex flex-row gap-2">
              <input
                type="text"
                placeholder="Enter folder name"
                className="input input-bordered w-full mb-4 focus:outline-none focus:ring-0 font-tertiary"
                value={folderNm}
                onChange={(e) => setFolderNm(e.target.value)}
              />
              <div className="tooltip ">
                <div className="tooltip-content rounded-sm absolute ">
                  <div className="animate-bounce text-orange-400 -rotate-10 text-xl font-black ">
                    Create!
                  </div>
                </div>
                <button
                  className=" btn btn-primary btn-md rounded-md font-secondary"
                  onClick={addFolder}
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-xl"></span>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
      <FolderAdd folders={folderName} />
    </div>
  );
};

export default Saved;
