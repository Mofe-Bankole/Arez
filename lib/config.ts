export const config = {
  devnet_rpc: process.env.DEVNET_RPC_URL!,
  mainnet_rpc: process.env.MAINNET_RPC_URL!,
  network: "devnet",
  mainnet_rpc_subscription_url: process.env.RPC_SUBSCRIPTION_URL!,
  devnet_rpc_subscription_url: process.env.DEVNET_RPC_SUBSCRIPTION_URL!,
  indexerApiEndpoint: process.env.INDEXER_API_ENDPOINT!,
  usdc_mint: process.env.USDC_MINT!,
};
