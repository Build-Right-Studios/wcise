import React from "react";

const Card = ({ imageurl, heading, subhead, para }) => {
    return (
        <div className="card flex flex-col items-center text-center w-full">
            <div className="flex justify-center mb-4">
                <img className="w-35 h-40 object-cover rounded" src={imageurl} alt={"Card image"} />
            </div>
            <div className="card-content flex flex-col items-center flex-grow">
                <h1 className="text-xl font-semibold mb-1">{heading}</h1>
                <h3 className="font-bold mb-2 text-[#4a6b8a]">{subhead}</h3>
                <p className="text-sm text-gray-700">{para}</p>
            </div>
        </div>
    );
};

export default Card;