import React from 'react';
import {useMetamask} from "@thirdweb-dev/react";

const LoginScreen = () => {
    const connectWithMetamask = useMetamask();
    return (
        <div className="bg-[#091B18] min-h-screen flex flex-col items-center justify-center">
           <div className="flex flex-col items-center mb-10 text-center">
               <img src="https://i.ytimg.com/vi/_RO6Q1qhm0c/maxresdefault.jpg" className="rounded-full h-56 w-56 mb-10 object-cover" alt=""/>
               <h1 className="text-6xl text-white font-bold">THE BORING DRAW</h1>
               <h1 className="text-white">Get Started By logging in with your MetaMask</h1>

               <button onClick={() => connectWithMetamask()} className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold">Login with MetaMask</button>
           </div>
        </div>
    );
};

export default LoginScreen;
