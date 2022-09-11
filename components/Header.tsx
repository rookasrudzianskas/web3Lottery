import React from 'react';
import NavButton from "./NavButton";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    return (
        <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center">
            <div className="flex items-center space-x-2">
                <img src="https://i.ytimg.com/vi/_RO6Q1qhm0c/maxresdefault.jpg" className="w-20 h-20 rounded-full object-cover" alt=""/>
                <div>
                    <h1 className="text-lg text-white font-bold">BORING DRAW</h1>
                    <h1 className="text-xs text-emerald-500 truncate">User...</h1>
                </div>
            </div>
            <div>
                <div className="bg-[#0A1F1C] p-4 space-x-2">
                    <NavButton title={'Buy Tickets'} isActive={true} />
                    <NavButton title={'Logout'} />
                </div>
            </div>
            <div>
                <MenuIcon className="h-8 w-8 mx-auto text-white hover:cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;
