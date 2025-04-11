import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import toast, { Toaster } from "react-hot-toast";

import UploadAnt from "./UploadAnt";
// import { pinata } from "../utils/pinata/config";
import { useAppContext } from "../context/AppProvider";

export default function CreatePost() {
  const { theme, createPost } = useAppContext();

  const edit = true;
  const [text, setTest] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const activeAccount = useActiveAccount();

  let notificationBg = theme == "black" ? "#333" : "#FFF";
  let notificationTextColor = theme == "black" ? "#FFF" : "#333";

  const create_notification = () =>
    toast.success("Successfully Created!", {
      style: { background: notificationBg, color: notificationTextColor },
    });

  const Post = async () => {
    try {
      setIsLoading(true);
      // let _cidPostPicture = "";
      const _caption = text;
      const _date = Date.now();
      const _user = activeAccount?.address;

      // if (fileList.length != 0) {
      //   let file = fileList[0].originFileObj;
      //   const upload = await pinata.upload.public.file(file);
      //   console.log("Upload successful:", upload);
      //   _cidPostPicture = upload.cid;
      // }

      await createPost(_user, _caption, _date, fileList);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setFileList([""]);
      setTest("");
      create_notification();
      setIsLoading(false);
    }
  };

  return (
    <div className="p-x-2 mb-4">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="border-2 border-base-300 rounded-lg p-3 flex flex-col space-y-2 bg-base-100">
        <textarea
          className="w-full resize-none bg-base-200 rounded-lg p-4 border-none text-base-content placeholder-base-content/50 focus:outline-none focus:ring-0 font-tertiary mb-2"
          rows="4"
          placeholder="Caption...."
          value={text}
          onChange={(e) => setTest(e.target.value)}
        />
        <div className="flex items-center justify-between relative">
          <UploadAnt filelst={fileList} setFileList={setFileList} edit={edit} />{" "}
          <div className="tooltip absolute right-0 bottom-1">
            <div className="tooltip-content rounded-sm absolute ">
              <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black ">
                Create!
              </div>
            </div>
            <button
              className=" btn btn-primary btn-sm rounded-lg font-secondary"
              onClick={Post}
            >
              {isloading ? (
                <span className="loading loading-infinity loading-xl"></span>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
