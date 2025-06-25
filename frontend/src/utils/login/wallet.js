import { createWallet, inAppWallet } from "thirdweb/wallets";

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "x", "phone", "github"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
