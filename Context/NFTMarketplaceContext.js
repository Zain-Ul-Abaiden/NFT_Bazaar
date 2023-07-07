"use client"
import React,{useState,useEffect,useContext, Children} from 'react'
// import web3model from "web3model"
import ethers from "ethers"
import Router from 'next/router'

//INTERNAL IMPORT
import { NFTMarketplaceAddress,NFTMarketplaceABI } from './constants'

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children})=>{
    const tittleData = "Discover, collect, and sell NFTs"
    return(
        <NFTMarketplaceContext.Provider value={{tittleData}}>
        {children}
        </NFTMarketplaceContext.Provider>
    )
})
