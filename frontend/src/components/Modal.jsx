import React from "react";

const MyModal = ({ CloseModal, imageurl, title, description }) => {
    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={CloseModal}
            ></div>

            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           bg-white text-[#1d3b58] shadow-4xl rounded-2xl p-8
                           max-w-4xl w-[95%] mx-auto md:w-[85%] lg:w-[75%] xl:w-[65%] // Increased width percentages
                           max-h-100 overflow-y-auto
                           z-50 text-justify"
            >
                <button
                    onClick={CloseModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                    &times;
                </button>

                <h2 id="modal-title" className="text-3xl font-bold mb-4 text-center">
                    {title}
                </h2>

                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

                    <img
                        src={imageurl}
                        alt={"Speaker image"}
                        className="w-30 h-35 sm:w-40 sm:h-45 rounded-2xl mx-auto md:mx-0 mb-4 md:mb-0 object-cover border-4 border-[#1d3b58] flex-shrink-0"
                    />

                    <div>
                        <p id="modal-description" className="text-lg text-gray-700 text-justify">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyModal;