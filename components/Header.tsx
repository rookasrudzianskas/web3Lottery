import React from 'react';
import NavButton from "./NavButton";
import MenuIcon from '@mui/icons-material/Menu';
import {useAddress, useDisconnect, useMetamask} from "@thirdweb-dev/react";

const Header = () => {
    const address = useAddress();
    const disconnect = useDisconnect();
    const connectWithMetamask = useMetamask();

    return (
        <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
            <div className="flex items-center space-x-2">
                <img src="https://i.ytimg.com/vi/_RO6Q1qhm0c/maxresdefault.jpg" className="w-20 h-20 rounded-full object-cover" alt=""/>
                <div>
                    <h1 className="text-lg text-white font-bold">BORING DRAW</h1>
                    <h1 className="text-xs text-emerald-500 truncate">User: {address?.substring(0, 5)}...{address?.substring(address?.length, address?.length - 5)}</h1>
                </div>
            </div>
            <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
                <div className="bg-[#0A1F1C] p-4 space-x-2">
                    <NavButton title={'Buy Tickets'} isActive={true} />
                    <NavButton onClick={() => disconnect()} title={'Logout'} />
                </div>
            </div>
            <div className="flex flex-col ml-auto text-right">
                <MenuIcon className="h-8 w-8 mx-auto text-white hover:cursor-pointer" />
                <span className="md:hidden">
                    <NavButton onClick={() => disconnect()} title={'Logout'} />
            </span>
            </div>

        </header>
    );
};

export default Header;
