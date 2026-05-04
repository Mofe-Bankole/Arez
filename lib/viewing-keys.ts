import { getMasterViewingKeyDeriver } from "@umbra-privacy/sdk";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";
import { clearInterval } from "timers";

export async function deriveMasterViewingKey(client: IUmbraClient) {
  const deriver = await getMasterViewingKeyDeriver({client});
  const key = await deriver();
  console.log(key);
  return key;
}
