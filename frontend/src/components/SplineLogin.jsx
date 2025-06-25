import Spline from "@splinetool/react-spline";
import React from "react";

import ConnectBtn from "./ConnectButton";

const SplineLogin = () => {

  const medium = () => {
    window.open("https://medium.com/@glenthevar1/hive-ec5b26bd3bed","_blank")
  }

  return (
    <div className="h-screen w-screen relative bg-[url(../background/bg.png)] ">
      <Spline scene="https://prod.spline.design/R9M7GRmHP5aRy-SO/scene.splinecode" />

      <div className="absolute text-center w-full top-1/3">
        <h1 className="text-8xl font-bold font-login-heading text-yellow-400">
          DIVE INTO THE HIVE
        </h1>

        <h1 className="text-4xl font-bold font-login-subheading text-yellow-400">
          Where ideas swarm and stories unfold...
          <button className="btn btn-warning font-bold ml-5 text-xl rounded-sm  bg-yellow-400 font-login-heading hover:bg-yellow-500 hover:border-yellow-500 hover:text-white" onClick={medium}>
            Learn More ?
          </button>
        </h1>
        <div className="mt-10">
          <div className="flex flex-col justify-center items-center">
            <ConnectBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplineLogin;
