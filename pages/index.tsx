import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import {useAddress, useContract, useDisconnect, useMetamask} from "@thirdweb-dev/react";
import LoginScreen from "../components/LoginScreen";
import PropagateLoader from 'react-spinners/PropagateLoader';

const Home: NextPage = () => {
    const address = useAddress();
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);

    if(!address) return (<LoginScreen />)
    if(isLoading) return (
        <div className="bg-[#091B18] h-screen flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-10">
                <img className="rounded-full h-20 w-20" src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/2071817190001/f5016671-d789-44e5-b6f7-7fe34e7b3c03/daeb36ad-de1c-4e9c-bca1-5ea47551e56d/1280x720/match/image.jpg" alt=""/>
                <h1 className="text-lg text-white font-bold">Loading the BORING DRAW</h1>
            </div>
            <PropagateLoader color="white" size={30} />
        </div>
    )
    return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title>Web3 Lottery</title>
        <link rel="icon" href="https://cf-images.us-east-1.prod.boltdns.net/v1/static/2071817190001/f5016671-d789-44e5-b6f7-7fe34e7b3c03/daeb36ad-de1c-4e9c-bca1-5ea47551e56d/1280x720/match/image.jpg" />
      </Head>

      <Header />
    </div>
  )
}

export default Home
