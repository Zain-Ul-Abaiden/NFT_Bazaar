import React from 'react'

//INTERNAL IMPORT

import images from "../Components/assets/img/index";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo
} from "../collectionPage/collectionindex";
import { Slider, Brand } from "../Components/Componentsindex";
import Filter from "../Components/Filter/Filter";
const collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div>
      <Banner bannerImage={images.creatorbackground1}/>
      <CollectionProfile />
      <Filter/>
      <NFTCardTwo NFTData={collectionArray}/>
      <Slider/>
      <Brand/>
    </div>
  )
}


export default collection