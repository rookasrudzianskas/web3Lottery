import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
    return (
        <div className="bg-[#091B18] h-screen flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-10">
                <img className="rounded-full h-20 w-20" src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/2071817190001/f5016671-d789-44e5-b6f7-7fe34e7b3c03/daeb36ad-de1c-4e9c-bca1-5ea47551e56d/1280x720/match/image.jpg" alt=""/>
                <h1 className="text-lg text-white font-bold">Loading the BORING DRAW</h1>
            </div>
            <PropagateLoader color="white" size={30} />
        </div>
    );
};

export default Loading;
