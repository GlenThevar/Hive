import { client } from "../login/client";

import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x62325e69bb9508c538ed5b2b00b57a41a6fc6f93",
});
