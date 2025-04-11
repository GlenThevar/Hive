import Spline from "@splinetool/react-spline";
import React from "react";

import ConnectBtn from "./ConnectButton";

const SplineLogin = () => {
  return (
    <div className="h-screen w-screen relative bg-[url(../background/bg.png)] ">
      <Spline scene="https://prod.spline.design/R9M7GRmHP5aRy-SO/scene.splinecode" />

      <div className="absolute text-center w-full top-1/3">
        <h1 className="text-8xl font-bold font-login-heading text-yellow-400">
          DIVE INTO THE HIVE
          {/* <span className="text-yellow-400">DIVE </span>{" "}
          <span className="text-yellow-400"> INTO</span>{" "}
          <span className="text-yellow-400">THE</span>{" "}
          <span className="text-yellow-400">HIVE</span> */}
        </h1>

        <h1 className="text-4xl font-bold font-login-subheading text-yellow-400">
          Where ideas swarm and stories unfold...
          {/* <span className="text-cyan-400">Where </span>{" "}
          <span className="text-red-400"> ideas</span>{" "}
          <span className="text-green-400">swarm</span>{" "}
          <span className="text-orange-400">and</span>{" "}
          <span className="text-blue-400">stories</span>{" "}
          <span className="text-yellow-400">unfold</span> */}
        </h1>
        <div className="mt-10">
          <ConnectBtn />
        </div>
      </div>
    </div>
  );
};

export default SplineLogin;
