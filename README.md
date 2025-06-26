# HIVE

<img width="1470" alt="Screenshot 2025-04-11 at 10 33 49 AM" src="https://github.com/user-attachments/assets/0066983e-4a2d-4575-b1fa-7cbca078e732" />


## Introduction

Hive is a blockchain based social media, it is a project that I decided to work upon in order to get a better understanding of how blockchain works. This project is a still a work in progress and I keep on itterating on it whenever I get the time to. I used thirdweb which allows users to build Dapps by abstracting most of the complexity. I used react and tailwind in order to build the frontend of the application along with daisy UI for the components. Additionally I have used pinata in order to store the images on the IPFS network. As of now, Hive is operating on the sepolia test nestnet.

##  Features

- Create posts and store them on the IPFS network
- Comment on posts, like posts and comments
- Support users by donating directly to them
- Set up personal profiles
- Save posts you enjoy
- Chat with other users


## Tech Stack Used

- **Frontend:** React & Tailwind
- **Backend:** Solidity, Pinata and Thirdweb

## Additional

![Static Badge](https://img.shields.io/badge/Hive%20Article%20-black?style=for-the-badge&logo=medium&label=MEDIUM&labelColor=black&color=grey&link=https%3A%2F%2Fmedium.com%2F%40glenthevar1%2Fhive-ec5b26bd3bed)

I have written an article for new users inorder to get a basic idea of how hive works 



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

