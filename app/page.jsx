"use client"
import React,{useState,useEffect,useContext} from "react";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Vedio,
} from "./Components/Componentsindex";

// IMPORT CONTRACT DATA
  import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext"
const page = () => {
  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext);
  useEffect(()=>{
    checkIfWalletConnected();
  },[])
  return (
    <div>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      <FollowerTab />
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Vedio />
    </div>

  );
};

export default page;
