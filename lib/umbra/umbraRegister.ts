import { getUserRegistrationFunction } from "@umbra-privacy/sdk";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";
import { getUserRegistrationProver } from "@umbra-privacy/web-zk-prover";

type Props = {
  umbraClient: IUmbraClient;
};

const prover = getUserRegistrationProver();
export async function handleUmbraRegistration({ umbraClient }: Props) {
  try {
    const register = getUserRegistrationFunction(
      { client: umbraClient },
      { zkProver: prover },
    );

    await register({
      confidential: true, // hide balance
      anonymous: true,
    });

    console.log("✅ UMBRA REGISTRATION COMPLETE");
    return { success: true };
  } catch (err: any) {
    if (
      err?.message?.toLowerCase().includes("already registered") ||
      err?.message?.toLowerCase().includes("account already exists")
    ) {
      // console.log("ℹ️ Already registered with Umbra");
      return { success: true, alreadyRegistered: true };
    }
    console.error("Umbra registration failed:", err);
    throw err;
  }
}
