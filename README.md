# Arez — Private Payroll on Solana

Send payroll privately. No amounts. No recipients. No traces.

Arez is a private payroll processor built on Solana that allows employers to
pay employees and contractors without exposing transaction details on-chain.
Built for the Umbra Side Track at Colosseum Hackathon 2025.

**Powered by Umbra · Fueled by Helius · Secured by Arcium MPC**

---

## The Problem

Every payroll transaction on Solana is public. Anyone with your wallet address
can see exactly who you paid, how much, and when. For businesses and DAOs this
is a serious privacy and competitive risk.

## The Solution

Arez uses Umbra's stealth pool and zero-knowledge proofs to break the on-chain
link between sender and receiver. What appears on Solana Explorer is a deposit
into the Umbra mixer — no recipient address, no amount, no memo.

---

## Features

- **Private Transfers** — Send SOL to any registered Umbra wallet with ZK
  proof shielding via Arcium MPC
- **Batch Payroll** — Upload a CSV and process multiple private payments
  sequentially in one flow
- **Claim Page** — Recipients scan the Umbra stealth pool and claim their
  funds privately
- **Compliance Grants** — Employers can issue selective viewing keys to
  auditors without exposing full transaction history
- **Transaction History** — View your public on-chain transaction history
  powered by Helius RPC
- **Public Transfers** — Standard unshielded transfers for non-sensitive
  payments

---

## How Private Transfers Work

1. Employer connects wallet and initializes Umbra client
2. Employer enters recipient address and amount
3. SDK creates a ZK proof and deposits into Umbra stealth pool
→ On-chain: "DepositIntoStealthPoolFromPublicBalance"
→ Explorer shows: mixer deposit, no recipient, no amount
4. Recipient connects their wallet on the Claim page
5. SDK scans the Umbra Merkle tree for UTXOs addressed to their X25519 key
6. Recipient claims — funds arrive in their encrypted balance

**Both sender and recipient must be registered with Umbra once before
transacting. Registration derives an X25519 keypair used for UTXO encryption.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Privacy | Umbra Protocol SDK |
| ZK Proofs | Arcium MPC via `@umbra-privacy/web-zk-prover` |
| RPC | Helius Devnet |
| Wallet | Phantom, Solflare, Backpack (via wallet-standard) |
| Network | Solana Devnet |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Solana wallet (Phantom or Solflare recommended)
- Helius API key — [get one free at helius.dev](https://helius.dev)

### Installation

```bash
git clone https://github.com/Mofe-Bankole/Arez
cd Arez
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NODE_ENV=development

# Helius RPC (recommended) or https://api.devnet.solana.com
NEXT_PUBLIC_DEVNET_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY

NEXT_PUBLIC_MAINNET_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_MAINNET_RPC_SUBSCRIPTION_URL=wss://api.mainnet-beta.solana.com
NEXT_PUBLIC_DEVNET_RPC_SUBSCRIPTION_URL=wss://api.devnet.solana.com

# Umbra devnet indexer — must be devnet, not mainnet
NEXT_PUBLIC_INDEXER_API_ENDPOINT=https://devnet.utxo-indexer.api.umbraprivacy.com
NEXT_PUBLIC_UMBRA_RELAYER=https://relayer.api.umbraprivacy.com

# Token mints
NEXT_PUBLIC_USDC_MINT=4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU
NEXT_PUBLIC_SOLANA_MINT=So11111111111111111111111111111111111111112
```

### Run

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Usage

### Sending a Private Payment

1. Connect your wallet
2. Navigate to **Send**
3. Enter recipient Solana address and amount
4. Ensure **Shield this payment** is toggled on
5. Click **Send Private Payment** and approve in your wallet

### Batch Payroll via CSV

CSV format:
```csv
wallet,amount,memo
7xKpExampleAddress,0.5,Engineering Salary Q2
9mQrExampleAddress,0.4,Design Salary Q2
```

1. Navigate to **Batch Payroll**
2. Upload or drag your CSV
3. Preview parsed recipients
4. Click **Execute Private Batch Transfer**

### Claiming a Payment (Recipient)

1. Connect the wallet that was paid
2. Navigate to **Claim**
3. Click **Scan & Claim Payments**
4. Approve the claim transaction in your wallet

---

## Important Notes

- Both sender and recipient must register with Umbra before transacting.
  Registration happens automatically on first app use.
- Claimed funds land in the recipient's **Umbra encrypted balance**, keeping
  the received amount private. This is by design.
- This project runs on **Solana devnet** only.

---

## Acknowledgements

- [Umbra Protocol](https://umbraprivacy.com) — privacy infrastructure
- [Arcium](https://arcium.com) — MPC network powering ZK proofs
- [Helius](https://helius.dev) — Solana RPC infrastructure
- [Colosseum](https://colosseum.org) — Hackathon organizers
