import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import LoginScreen from "../components/LoginScreen";

const Home: NextPage = () => {
    const address = useAddress();

    if(!address) return (<LoginScreen />)
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
