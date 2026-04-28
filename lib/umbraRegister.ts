import { getUserRegistrationFunction } from "@umbra-privacy/sdk";

type Props = {
  umbraClient: any;
};

export async function handleUmbraRegistration({ umbraClient }: Props) {
  try {
    const register = getUserRegistrationFunction({ client: umbraClient });

    // register() is idempotent — safe to call even if already registered
    await register({
      confidential: true, // hide balance
      anonymous: true, // hide identity
    });

    console.log("✅ UMBRA REGISTRATION COMPLETE");
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
