import { client } from "../login/client";

import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x2fa25b1aab0d80fa9e7867aa40cdd43d34529e24",
});
