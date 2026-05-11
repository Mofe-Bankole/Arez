"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useUmbraClient } from "@/hooks/useUmbraClient";

// Define the shape of the Umbra context once, outside the provider component.
export type UmbraContextType = ReturnType<typeof useUmbraClient>;
// The context may be undefined before the provider is rendered.
export const UmbraContext = createContext<UmbraContextType | undefined>(undefined);

export function UmbraProvider({ children }: { children: ReactNode }) {
  // Initialise the Umbra client hook inside the provider.
  const umbra = useUmbraClient();
  return (
    <UmbraContext.Provider value={umbra}>
      {children}
    </UmbraContext.Provider>
  );
}

export function useUmbra() {
  const ctx = useContext(UmbraContext);
  if (!ctx) {
    throw new Error("useUmbra must be used within UmbraProvider");
  }
  return ctx;
}
