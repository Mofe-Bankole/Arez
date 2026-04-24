"use client";

import { getUserRegistrationFunction } from "@umbra-privacy/sdk";

export async function handleUmbraRegistration(umbraClient: any) {
  if (!umbraClient) {
    console.error("UmbraClient is not initialized yet");
    return;
  }

  try {
    const register = getUserRegistrationFunction({ client: umbraClient });

    const signatures = await register({
      confidential: true,
      anonymous: true,
    });

    console.log(`REGISTRATION SIGNATURES : ${signatures}`)
    return signatures;
  } catch (error) {
    console.error("Umbra registration failed:", error);
    throw error;
  }
