"use client";
import { useUmbraClient } from "@/hooks/useUmbraClient";
import { getUserRegistrationFunction } from "@umbra-privacy/sdk";
// import { UmbraClient } from "./umbra";

export async function handleUmbraRegistration() {
  const { umbraClient } = useUmbraClient();
  const register = getUserRegistrationFunction({ client: umbraClient });

  const signatures = await register({
    confidential: true,
    anonymous: true,
  });

  console.log(signatures);
}
