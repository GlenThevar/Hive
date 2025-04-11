import React, { useEffect } from "react";
import { ConnectButton } from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

import { client } from "../utils/login/client";
import { wallets } from "../utils/login/wallet";

const ConnectBtn = () => {
  const status = useActiveWalletConnectionStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (status == "connected") {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <div>
      <ConnectButton
        client={client}
        wallets={wallets}
        connectModal={{
          size: "wide",
          showThirdwebBranding: false,
        }}
      />
    </div>
  );
};

export default ConnectBtn;
