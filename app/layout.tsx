import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/providers/WalletProvider";
import { UmbraProvider } from "../context/UmbraContext";

export const metadata: Metadata = {
  title: "Arez",
  description: "The Private Payroll Layer for Solana",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SolanaWalletProvider>
          <UmbraProvider>{children}</UmbraProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
