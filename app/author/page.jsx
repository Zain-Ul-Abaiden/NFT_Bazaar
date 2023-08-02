"use client"
import React, {useState,useEffect,useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import Banner  from "../collectionPage/Banner/Banner";
import { Brand, Title } from "../Components/Componentsindex";
import FollowerTabCard from "../Components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../Components/assets/img/index";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorpage/components.index";

//IMPORT SMART CONTRACT
import {NFTMarketplaceContext}  from "../../Context/NFTMarketplaceContext"
const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
//IMPORT SMART CONTRACT DATA
const {fetchMyNFTsOrListedNFTs,CurrentAccount} = useContext(NFTMarketplaceContext);

const [nfts,setNfts] = useState([]);
const [myNFTs,setMyNfts] = useState([]);

useEffect(()=>{
  fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items)=>{
    setNfts(items);
  })
},[]);

useEffect(()=>{
  fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items)=>{
    setMyNfts(items);
  })
},[])
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard CurrentAccount={CurrentAccount}/>
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNFTs={myNFTs}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default author;