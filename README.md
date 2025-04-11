# Hive

Hive is a social media web app I built to learn more about blockchain and how data works on the IPFS network. While working on this project, I explored how decentralized storage helps keep content safe from censorship and truly owned by the creator.

Right now, Hive is running on the Sepolia testnet. It already supports the basic features you’d expect in a typical social media app. I'm planning to improve it further and make it more stable in the future.

I created this app during my final year of college, but it wasn’t just a college project. I got interested in the word “blockchain” because it sounded cool, and I wanted to understand how decentralized apps (dApps) are actually built.

<img width="1470" alt="Screenshot 2025-04-11 at 10 33 49 AM" src="https://github.com/user-attachments/assets/e1bdf9ef-0605-4bf9-b440-396918f48b62" />


##  Features

- Create posts and store them on the IPFS network
- Comment on posts, like posts and comments
- Support users by donating directly to them
- Set up personal profiles
- Save posts you enjoy
- Chat with other users


## Tech Stack Used

- **Frontend:** React & Tailwind
- **Backend:** Solidity & Pinata


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

