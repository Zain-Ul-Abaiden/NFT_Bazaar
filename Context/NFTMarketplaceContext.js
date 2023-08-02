"use client"
import React,{useState, useEffect, useContext, Children} from 'react'
import Web3Modal from "web3modal"
import {ethers} from "ethers";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {create as ipfsHttpClient} from "ipfs-http-client";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const projectId = "2SKa86STBXzefGrry7HtwHrZCp4";
const projectSecretKey = "23a42c7a09700e15f459c071ceb4dbc2"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain ="https://nft-bazaar.infura-ipfs.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//INTERNAL IMPORT
import { NFTMarketplaceAddress,NFTMarketplaceABI } from './constants'


//FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    )


// CONNECTING WITH SMARTCONTRACT
const connectingWithSmartCotract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect(); // create connection
        console.log(connection);
        const provider = new ethers.providers.Web3Provider(connection, 'any');
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
        console.log("Something went wrong while connecting with contract")
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children})=>{
    const tittleData = "Discover, collect, and sell NFTs"

//USESTATE
const [CurrentAccount,setCurrentAccount] = useState("");
const router = useRouter();
//--CHECK WALLET IS CONNECTED
 const checkIfWalletConnected = async()=>{
    try {
        if(!window.ethereum) return console.log("Install MetaMask")

        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        })

        if(accounts.length){
            setCurrentAccount(accounts[0])
        } else {
            console.log("no account found");
        }
        console.log(CurrentAccount);
    } catch (error) {
        console.log("Something wrong while connecting to wallet");
    }}

    useEffect(() => {
        checkIfWalletConnected();
      }, []);

      //CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
     // window.location.reload();
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };

  //-- UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error Uploading to IPFS", (error));
    }
  };

  // CREATENFT FUNCTION
  const createNFT = async (name, price, image ,description, router) => {
    if (!name || !description || !price || !image)
      return console.log("Data is Missing");
    const data = JSON.stringify({ name, description, image});
    try {
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      await createSale(url, price);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATESALE FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartCotract();
      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.reSellToken(url, price, {
            value: listingPrice.toString(),
          });
      await transaction.wait();
      router.push('/searchPag');
      console.log(transaction);
    } catch (error) {
      console.log(error); 
      console.log("Error while creating Sale");
    }
  };

  //FETCHNFT FUNCTION
  const fetchNFT = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const data = await contract.fetchMarketItem();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            try {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );
              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            } catch (error) {
              console.log(`Error while fetching NFT with tokenId ${tokenId}:`, error);
              throw error;
            }
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching NFTs:", error);
      throw error;
    }
  };
  
  useEffect(()=>{
    fetchNFT();
  }, [])
  //FETCHING MY NFT OR LISTED NFT
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartCotract();
      const data = (type = "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFT());

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching listed NFTs");
    }
  };
useEffect(()=>{
  fetchMyNFTsOrListedNFTs();
},[])
  //BUY NFT FUNCTION
const buyNFT = async(nft)=>{
   try {
    const contract = await connectingWithSmartCotract();
    const price = ethers.utils.parseUnits(nft.price.toString(),"ether")
    const transaction = await contract.createMarketSale(nft.tokenId,{
        value:price
    })
    await transaction.wait();
    router.push("/author")
   } catch (error) {
    console.log("Error while buying NFT")
   }
}

// const checkContract = async()=>{
//     const contract = await connectingwithSmartCotract();
//     console.log(contract);
// }
    return(
        <NFTMarketplaceContext.Provider value={{
            checkIfWalletConnected,
            connectWallet,
            uploadToIPFS,
            createNFT,
            fetchNFT,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            CurrentAccount,
            tittleData,
          }}>
        {children}
        </NFTMarketplaceContext.Provider>
    )
})
