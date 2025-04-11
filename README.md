# Hive - A Decentralized Social Content Platform

**Hive** is a blockchain-based social application that allows users to share content, connect through conversations, build personal profiles, donate to creators, and interact with posts through likes, comments, and saves — all on a decentralized network.

Built using **Thirdweb** and **IPFS via Pinata**, Hive ensures your content is secure, censorship-resistant, and user-owned. Currently running on the **Sepolia testnet**, Hive is under active development.

---

##  Features

- Share content and media
- Start conversations and comment on posts
- Like, save, and support your favorite posts
- Create personal profiles
- Donate to users directly
- IPFS-powered content hosting via Pinata
- Smart contracts deployed using Thirdweb

---

## ⚒️ Tech Stack

- **Blockchain:** Ethereum (Sepolia Testnet)
- **Storage:** IPFS + Pinata
- **Smart Contracts:** Thirdweb
- **Frontend:** React & Tailwind

---

## Getting Started

### 1. Clone the Repository and Install the dependencies

```bash
git clone https://github.com/your-org/hive.git
cd hive
npm install
```

### 2. Setting up the .env variables
- Create a thirdweb account, make a project and get the client ID and the secret key.
- Create the contracts and upload them to the thirdweb project using the secret key.
- Store the addresses of the contracts in the respective .js files
- Create an coount on pinata and get the domain name and the key
- Add the domain name, the key and the client ID to the .env file 

### 2. Run the app
```bash
npm run dev
```



