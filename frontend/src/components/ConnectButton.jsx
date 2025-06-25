import React from "react";
import { ConnectButton } from "thirdweb/react";
import { useNavigate } from "react-router-dom";

import { client } from "../utils/login/client";
import { wallets } from "../utils/login/wallet";
import { useAppContext } from "../context/AppProvider";

const ConnectBtn = () => {
  const navigate = useNavigate();
  const { SetLoggedIn } = useAppContext();

  

  return (
    <div>
      <ConnectButton
        client={client}
        wallets={wallets}
        connectModal={{
          size: "wide",
          showThirdwebBranding: false,
        }}
        onConnect={() => {
          navigate("/");
          SetLoggedIn(true);
        }}
      />
    </div>
  );
};

export default ConnectBtn;
