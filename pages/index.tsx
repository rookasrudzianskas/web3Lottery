import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import {
    useAddress,
    useContract,
    useContractCall,
    useContractData,
    useDisconnect,
    useMetamask
} from "@thirdweb-dev/react";
import LoginScreen from "../components/LoginScreen";
import PropagateLoader from 'react-spinners/PropagateLoader';
import Loading from "../components/Loading";
import {useEffect, useState} from "react";
import { ethers } from 'ethers';
import {currency} from "../constance";
import CountDownTimer from "../components/CountDownTimer";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";

const Home: NextPage = () => {
    const address = useAddress();
    const [userTickets, setUserTickets] = useState(0);
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const [quantity, setQuantity] = useState<number>(1);
    const { data: remainingTickets } = useContractData(contract, "RemainingTickets");
    const { data: currentWinningReward } = useContractData(contract, "CurrentWinningReward");
    const { data: ticketPrice } = useContractData(contract, "ticketPrice");
    const { data: ticketCommission } = useContractData(contract, "ticketCommission");
    const { data: expiration } = useContractData(contract, "expiration");
    const {mutateAsync: BuyTickets} = useContractCall(contract, "BuyTickets");
    const { data: tickets } = useContractData(contract, "getTickets");
    const { data: winnings } = useContractData(contract, "getWinningsForAddress", address);
    const { mutateAsync: WithdrawWinnings } = useContractCall(contract, "WithdrawWinnings");
    const { data: lastWinner} = useContractData(contract, "lastWinner");
    const { data: lastWinnerAmount } = useContractData(contract, 'lastWinnerAmount');


    useEffect(() => {
        if(!tickets) return;
        const totalTickets: string[] = tickets;
        const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => (ticketAddress === address ? total + 1 : total), 0);
        setUserTickets(noOfUserTickets);
    }, [tickets, address]);

    // console.log(userTickets)

    if(!address) return (<LoginScreen />)
    if(isLoading) return (<Loading />);

    const handleClick = async () => {
        if(!ticketPrice) return;

        const notification = toast.loading("Buying your transaction...");

        try {
            const data = await BuyTickets([
                {
                    value: ethers.utils.parseEther(
                        (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
                    ),
                },
            ]);
            toast.success("Tickets purchased successfully!", {
                id: notification,
            });

            console.log("contract call success", data);

        } catch (e) {
            toast.error("Whoops, something went wrong", {
                id: notification
            });
            console.error("contract call failure", e);
        }

    }

    const onWithdrawWinnings = async () => {
        const notification = toast.loading("Withdrawing your winnings...");

        try {
            const data = await WithdrawWinnings([{}]);
            toast.success("Winnings withdrawn successfully!", {
                id: notification
            });
        } catch (e) {
            toast.error("Whoops something went wrong", {
                id: notification
            });
            console.error("contract call fail", e)
        }
    }

    return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title>Web3 Lottery</title>
        <link rel="icon" href="https://cf-images.us-east-1.prod.boltdns.net/v1/static/2071817190001/f5016671-d789-44e5-b6f7-7fe34e7b3c03/daeb36ad-de1c-4e9c-bca1-5ea47551e56d/1280x720/match/image.jpg" />
      </Head>

        <div className="flex-1">
            <Header />

            <Marquee className="bg-[#0A1F1C] p-5 mb-5" gradient={false} speed={100}>
                <div className="flex space-x-2 mx-10">
                    <h4 className="text-white font-bold">Last Winnter: {lastWinner?.toString()}</h4>
                    <h4 className="text-white font-bold">Previous winnngs: {lastWinnerAmount && (ethers.utils.formatEther(lastWinnerAmount?.toString()))}{" "}{currency}{" "}</h4>
                </div>
            </Marquee>

            {winnings > 0 && (
                <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
                    <button onClick={onWithdrawWinnings} className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full">
                        <p className="font-bold">Winner Winner Chicken Dinner!</p>
                        <p>Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "}{currency}</p>
                        <br/>
                        <p className="font-semibold">Click here to withdraw</p>
                    </button>
                </div>
            )}

            <div className="space-y-5  md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
                <div className="stats-container">
                    <h1 className="text-5xl text-white font-semibold text-center">The Next Draw</h1>
                    <div className="flex justify-between p-2 space-x-2">
                        <div className="stats">
                            <h2 className="text-sm">Total Pool</h2>
                            <p className="text-xl">
                                {currentWinningReward && ethers.utils.formatEther(currentWinningReward.toString())}{" "}
                                {currency}
                            </p>
                        </div>
                        <div className="stats">
                            <h1>Tickets Remaining</h1>
                            <p className="text-xl">{remainingTickets?.toNumber()}</p>
                        </div>
                    </div>

                    <div className="mt-5 mb-3">
                        {/*    countdown */}
                        <CountDownTimer />
                    </div>
                </div>

                <div className="stats-container space-y-2">
                    <div className="stats-container">
                        <div className="flex justify-between items-center text-white pb-2">
                            <h2 className="">Price per ticket</h2>
                            <h2>
                                {ticketPrice &&
                                    ethers.utils.formatEther(ticketPrice?.toString())
                                }{" "}{currency}
                            </h2>
                        </div>
                        <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004227] border p-4">
                            <p>TICKETS</p>
                            <input min={1} max={10} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="flex w-full bg-transparent text-right outline-none" type="number"/>
                        </div>
                        <div className="space-y-2 mt-5">
                            <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                                <p>Total cost of tickets</p>
                                <p>
                                    {ticketPrice && (
                                        Number(ethers.utils.formatEther(ticketPrice?.toString())) * quantity)}{" "} {currency}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                                <p>Service fees</p>
                                <p>
                                    {ticketCommission &&
                                        ethers.utils.formatEther(ticketCommission?.toString())
                                    }{" "}{currency}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                                <p>+ Network Fees</p>
                                <p>TBC</p>
                            </div>
                        </div>
                        <button onClick={handleClick} disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0} className="mt-5 w-full font-semibold bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-500 disabled:cursor-not-allowed">
                            Buy {quantity} tickets for {ticketPrice && (
                                Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity
                        )}{" "} {currency}
                        </button>
                    </div>
                    {userTickets > 0 && (
                        <div className="stats">
                            <p className="text-lg mb-2">You have {userTickets} Tickets in this draw</p>
                            <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                                {Array(userTickets).fill("").map((_, index) => (
                                    <p key={index} className="text-emerald-300 h-20 w-12 rounded bg-emerald-500/30 rounded-g flex flex-shrink-0 items-center justify-center text-xs italic">{index + 1}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <div>

                </div>
            </div>
        </div>

        <footer className="border-t border-emerald-500/20 flex items-center justify-between text-white p-5">
            <p className="text-xs text-emerald-900 pl-5">
            {/*    disclaimer text about this */}
                All product and company names are trademarks™M or registered® trademarks of their respective holders. Use of them does not imply ar
                affiliation with or endorsement by them.
                Any product names, logos, brands, and other trademarks or images featured or referred to within the deimelguitarworks.com website are the
                property of their respective trademark holders. These trademark holders are not affiliated with Deimel Guitarworks, our products,
                websites.
            </p>
        </footer>
    </div>
  )
}

export default Home
