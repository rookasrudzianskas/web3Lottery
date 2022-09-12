import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
import {useContract, useContractCall, useContractData} from "@thirdweb-dev/react";
import {ethers} from "ethers";
import {currency} from "../constance";
import toast from "react-hot-toast";

const AdminControls = () => {
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const { data: totalCommission } = useContractData(contract, "operatorTotalCommission");

    const { mutateAsync: DrawWinnerTicket } = useContractCall(contract, "DrawWinnerTicket");
    const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll");
    const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");
    const { mutateAsync: WithdrawCommission } = useContractCall(contract, "WithdrawCommission");

    const drawWinner = async () => {
        const notification = toast.loading('Picking a lucky Winner...');

        try {
            const data = await DrawWinnerTicket([{}]);

            toast.success('Winner has been picked!', {
                id: notification
            } );
            console.log("contract call success");
        } catch (e) {
            toast.error("Whops something went wrong", {
                id: notification
            });
            console.error("contract call failure", e);
        }
    }

    const onWithdrawCommission = async () => {
        const notification = toast.loading('Withdrawing commission...');

        try {
            const data = await WithdrawCommission([{}]);

            toast.success('Your commission has been withdrawn successfully!', {
                id: notification
            } );
            console.log("contract call success");
        } catch (e) {
            toast.error("Whops something went wrong", {
                id: notification
            });
            console.error("contract call failure", e);
        }
    }

    const onRestartDraw = async () => {
        const notification = toast.loading('Restarting draw...');

        try {
            const data = await restartDraw([{}]);

            toast.success('Draw restarted successfully!', {
                id: notification
            } );
            console.log("contract call success");
        } catch (e) {
            toast.error("Whops something went wrong", {
                id: notification
            });
            console.error("contract call failure", e);
        }
    }

    const onRefundAll = async () => {
        const notification = toast.loading('Refunding all...');

        try {
            const data = await RefundAll([{}]);

            toast.success('All refunded successfully!', {
                id: notification
            } );
            console.log("contract call success");
        } catch (e) {
            toast.error("Whops something went wrong", {
                id: notification
            });
            console.error("contract call failure", e);
        }
    }

    return (
        <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
            <h1 className="font-bold">Admin Controls</h1>
            <p className="mb-5">Total Commission to be withdrawn: {totalCommission && ethers.utils.formatEther(totalCommission?.toString())}{" "}{currency}</p>

            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <button onClick={drawWinner} className="admin-button">
                    <StarIcon className="h-6 mx-auto mb-2" />
                    Draw Winner
                </button>
                <button onClick={onWithdrawCommission} className="admin-button">
                    <CurrencyBitcoinIcon className="h-6 mx-auto mb-2" />
                    Withdraw Commission
                </button>
                <button onClick={onRestartDraw} className="admin-button">
                    <UTurnRightIcon className="h-6 mx-auto mb-2" />
                    Restart Draw
                </button>
                <button onClick={onRefundAll} className="admin-button">
                    <RoundaboutLeftIcon className="h-6 mx-auto mb-2" />
                    Refund ALl
                </button>
            </div>
        </div>
    );
};

export default AdminControls;
