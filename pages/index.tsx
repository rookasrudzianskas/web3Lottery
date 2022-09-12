import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import {useAddress, useContract, useDisconnect, useMetamask} from "@thirdweb-dev/react";
import LoginScreen from "../components/LoginScreen";
import PropagateLoader from 'react-spinners/PropagateLoader';
import Loading from "../components/Loading";
import {useState} from "react";

const Home: NextPage = () => {
    const address = useAddress();
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const [quantity, setQuantity] = useState<number>(1);

    if(!address) return (<LoginScreen />)
    if(isLoading) return (<Loading />)
    return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title>Web3 Lottery</title>
        <link rel="icon" href="https://cf-images.us-east-1.prod.boltdns.net/v1/static/2071817190001/f5016671-d789-44e5-b6f7-7fe34e7b3c03/daeb36ad-de1c-4e9c-bca1-5ea47551e56d/1280x720/match/image.jpg" />
      </Head>

        <div className="flex-1">
            <Header />

            <div className="space-y-5  md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
                <div className="stats-container">
                    <h1 className="text-5xl text-white font-semibold text-center">The Next Draw</h1>
                    <div className="flex justify-between p-2 space-x-2">
                        <div className="stats">
                            <h2 className="text-sm">Total Pool</h2>
                            <p className="text-xl">0.1 MATIC</p>
                        </div>
                        <div className="stats">
                            <h1>Tickets Remaining</h1>
                            <p className="text-xl">100</p>
                        </div>
                    </div>

                    <div>
                        {/*    countdown */}
                    </div>
                </div>

                <div className="stats-container space-y-2">
                    <div className="stats-container">
                        <div className="flex justify-between items-center text-white pb-2">
                            <h2 className="">Price per ticket</h2>
                            <h2>0.01 MATIC</h2>
                        </div>
                        <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004227] border p-4">
                            <p>TICKETS</p>
                            <input min={1} max={10} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="flex w-full bg-transparent text-right outline-none" type="number"/>
                        </div>
                        <div className="space-y-2 mt-5">
                            <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                                <p>Total cost of tickets</p>
                                <p>0.999999</p>
                            </div>
                            <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                                <p>Service fees</p>
                                <p>0.01 MATIC</p>
                            </div>

                            <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                                <p>+ Network Fees</p>
                                <p>TBC</p>
                            </div>
                        </div>
                        <button disabled={false} className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-500 disabled:cursor-not-allowed">
                            Buy tickets
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div>

                </div>
            </div>
        </div>

    </div>
  )
}

export default Home
