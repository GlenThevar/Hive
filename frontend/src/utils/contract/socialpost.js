import { client } from "../login/client";

import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xbf34eE0CA143F25D232eEFD13B66eFf3a3788635",
});

