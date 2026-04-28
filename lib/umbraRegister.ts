import { getUserRegistrationFunction } from "@umbra-privacy/sdk";
import { getUserRegistrationProver } from "@umbra-privacy/web-zk-prover";

type Props = {
  umbraClient: any;
};

const prover = getUserRegistrationProver();
export async function handleUmbraRegistration({ umbraClient }: Props) {
  try {
    const register = getUserRegistrationFunction(
      { client: umbraClient },
      { zkProver: prover },
    );

    // register() is idempotent — safe to call even if already registered
    const regis = await register({
      confidential: true, // hide balance
      anonymous: true,
    });

    console.log("✅ UMBRA REGISTRATION COMPLETE");
    console.log(regis);
    return { success: true };
  } catch (err: any) {
    // "already registered" is not a real error — swallow it
    if (
      err?.message?.toLowerCase().includes("already registered") ||
      err?.message?.toLowerCase().includes("account already exists")
    ) {
      console.log("ℹ️ Already registered with Umbra");
      return { success: true, alreadyRegistered: true };
    }
    console.error("Umbra registration failed:", err);
    throw err;
  }
}
