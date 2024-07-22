import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


import morningImage from '../assets/i1.png';
import nightImage from '../assets/i5.png';
import noonImage from '../assets/i2.png';
import afternoonImage from '../assets/i3.png';
import eveningImage from '../assets/i4.png';

const imageGallery = {
    morning: morningImage,
    night: nightImage,
    noon: noonImage,
    afternoon: afternoonImage,
    evening: eveningImage,
};

const getThemeClass = (theme) => {
    switch (theme) {
        case 'morning':
            return 'bg-neutral-50 text-neutral-950';
        case 'noon':
            return 'bg-neutral-200 text-neutral-800';
        case 'afternoon':
            return 'bg-neutral-400 text-neutral-700';
        case 'evening':
            return 'bg-neutral-600 text-neutral-300';
        case 'night':
            return 'bg-neutral-900 text-neutral-100';
        default:
            return 'bg-neutral-50 text-neutral-950';
    }
};

const getContainerColors = (theme) => {
    switch (theme) {
        case 'morning':
            return 'bg-neutral-200 text-neutral-900';
        case 'noon':
            return 'bg-neutral-400 text-neutral-600';
        case 'afternoon':
            return 'bg-neutral-700 text-neutral-400';
        case 'evening':
            return 'bg-neutral-900 text-neutral-300';
        case 'night':
            return 'bg-black text-neutral-200';
        default:
            return 'bg-white text-black';
    }
};

const getHighlightedContainerColors = (theme) => {
    switch (theme) {
        case 'morning':
            return 'bg-black text-neutral-200';
        case 'noon':
            return 'bg-neutral-900 text-neutral-300';
        case 'afternoon':
            return 'bg-neutral-700 text-neutral-400';
        case 'evening':
            return 'bg-neutral-400 text-neutral-600';
        case 'night':
            return 'bg-neutral-200 text-neutral-900';
        default:
            return 'bg-white text-black';
    }
};

const About = () => {
    const theme = useSelector((state) => state.theme.themeMode);
    const themeImage = imageGallery[theme] || imageGallery['morning'];


    return (
        <div className={`flex justify-end min-h-screen ${getThemeClass(theme)}`}>
            <motion.div 
                className="w-full md:w-4/5 flex flex-col md:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Left Container */}
                <motion.div 
                    className="w-full md:w-1/2 mb-16 flex flex-col"
                    initial={{ x: -200 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Top 40% Container */}
                    <div className="h-2/5 p-6 flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold mb-6">About Us</h1>
                        <p>
                            Welcome to MinimaCoupon, your number one source for all things minimal. We're dedicated to giving you the very best of coupons, with a focus on simplicity, reliability, and customer service.
                        </p>
                    </div>
                    {/* Bottom 60% Container */}
                    <div className="h-3/5 flex flex-col md:flex-row">
                        <motion.div 
                            className={`w-full md:w-1/2 m-2 p-6 flex flex-col rounded-3xl mb-5 justify-center ${getHighlightedContainerColors(theme)}`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                            <div>
                                <p className="">
                                    Using MinimaCoupon is simple:
                                </p>
                                <ul className="list-disc pl-5">
                                    <li className="mb-2">Sign up or log in to your account.</li>
                                    <li className="mb-2">Browse available Coupons.</li>
                                    <li className="mb-2">Help by adding your coupons</li>
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div 
                            className={`w-full md:w-1/2 p-6 m-2 flex flex-col rounded-3xl mb-5 justify-center ${getContainerColors(theme)}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <div>
                                <p className="">
                                    At MinimaCoupon, we aim to reduce waste. Our platform allows users to add unused coupons, helping someone who might need them.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                {/* Right Container */}
                <motion.div 
                    className=" order-first  md:order-last  w-full md:w-1/2 p-6 flex justify-center items-center"
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-full h-96 md:h-full bg-gray-300 rounded-3xl overflow-hidden">
                        <motion.img
                            src={themeImage}
                            alt="Theme based"
                            className="object-cover w-full h-full"
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;