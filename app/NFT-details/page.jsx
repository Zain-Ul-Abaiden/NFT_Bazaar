"use client"
import React,{useState, useEffect, useContext} from "react";
import { useRouter } from 'next/navigation';
//INTERNAL IMPORT
import { Button, Category, Brand } from "../Components/Componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

// IMPORT SMART CONTRACT DATA
import {NFTMarketplaceContext} from "../../Context/NFTMarketplaceContext"
const NFTDetails = () => {
  const {CurrentAccount} = useContext(NFTMarketplaceContext);
  const [nft,setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: ""
  })
  const router = useRouter();
  useEffect(()=>{
    if(!router.isReady) return;
    setNft(router.query);
  },[router.isReady]);
  return (
    <div>
      <NFTDetailsPage />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;