import React from "react";

//INTRNAL IMPORT
// import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../Components/Componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../Components/Componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionindex";
import images from "../Components/assets/img/index";

const searchPage = () => {
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
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;