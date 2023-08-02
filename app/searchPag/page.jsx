"use client"
import React, {useEffect, useState, useContext} from "react";

//INTRNAL IMPORT
// import Style from "../styles/searchPag.module.css";
import { Slider, Brand } from "../Components/Componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../Components/Componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionindex";
import images from "../Components/assets/img/index";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
const searchPag = () => {
  const {fetchNFT} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  
  useEffect(()=>{
    fetchNFT().then((item)=>{
      setNfts(item.reverse());
      setNftsCopy(item);
      console.log(nfts);
    });
  },[]);
  
  console.log(nfts);
  const onHandleSearch = (value)=> {
    const filteredNFTS = nfts.filter(({name}) => name.toLowerCase().includes(value.toLowerCase()));
    
    if(filteredNFTS.length === 0){
      setNfts(nftsCopy);
    } else{
      setNfts(filteredNFTS);
    }
  };
  
  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy);
    }
  };
  
  // const collectionArray = [
    //   images.nft_image_1,
    //   images.nft_image_2,
    //   images.nft_image_3,
    //   images.nft_image_1,
    //   images.nft_image_2,
    //   images.nft_image_3,
    //   images.nft_image_1,
    //   images.nft_image_2,
  // ];
  return (
    <div>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar 
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPag;