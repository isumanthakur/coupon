import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';

// Import images for each theme
import morningImage from '../assets/login1.png';
import nightImage from '../assets/login5.png';
import noonImage from '../assets/login2.png';
import afternoonImage from '../assets/login3.png';
import eveningImage from '../assets/login4.png';

const imageGallery = {
    morning: morningImage,
    night: nightImage,
    noon: noonImage,
    afternoon: afternoonImage,
    evening: eveningImage,
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

const getInputClass = (theme) => {
    switch (theme) {
        case 'morning':
            return 'text-neutral-200 placeholder-neutral-300';
        case 'night':
            return 'text-neutral-900 placeholder-neutral-800';
        case 'noon':
            return 'text-neutral-300 placeholder-neutral-400';
        case 'afternoon':
            return 'text-neutral-400 placeholder-neutral-500';
        case 'evening':
            return 'text-neutral-600 placeholder-neutral-700';
        default:
            return 'text-black placeholder-gray-500';
    }
};

const getNormalButtonClass = (theme) => {
    switch (theme) {
        case 'morning':
            return 'text-neutral-950 bg-neutral-100 hover:bg-neutral-950 hover:text-neutral-100';
        case 'noon':
            return 'text-neutral-800 bg-neutral-200 hover:bg-neutral-800 hover:text-neutral-200';
        case 'afternoon':
            return 'text-neutral-600 bg-neutral-300 hover:bg-neutral-600 hover:text-neutral-300';
        case 'evening':
            return 'text-neutral-200 bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-800';
        case 'night':
            return 'text-neutral-50 bg-neutral-950 hover:bg-neutral-50 hover:text-neutral-950';
        default:
            return 'text-neutral-50 hover:bg-neutral-950 hover:text-neutral-950';
    }
};

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const theme = useSelector((state) => state.theme.themeMode);
    const themeImage = imageGallery[theme] || imageGallery['morning'];
    const inputClass = getInputClass(theme);
    const buttonClass = getNormalButtonClass(theme);

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <motion.div 
            className="flex flex-col min-h-screen md:flex-row md:ml-[20%] md:w-[80%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Left Side */}
            <motion.div 
                className="w-full h-1/2 md:h-screen md:w-1/2"
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <img
                    src={themeImage}
                    alt="Theme based"
                    className="object-cover w-full h-full"
                />
            </motion.div>

            {/* Right Side */}
            <motion.div 
                className={`flex flex-col h-96 mt-28 md:mt-0 md:h-screen justify-between p-8 w-full md:w-1/2 ${getHighlightedContainerColors(theme)} rounded-t-3xl md:rounded-t-none md:rounded-l-3xl`}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="max-w-md mx-auto w-full">
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                </div>
                <div className="max-w-md mx-auto w-full mt-auto">
                    <form onSubmit={handleSubmit(login)} className='space-y-6'>
                        <motion.div 
                            className='mb-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                className={`mt-1 p-2 block w-full bg-transparent border-0 ${inputClass} rounded-md`}
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                        </motion.div>
                        <motion.div 
                            className='mb-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                className={`mt-1 p-2 block w-full bg-transparent border-0 ${inputClass} rounded-md`}
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </motion.div>
                        <motion.button 
                            type="submit"
                            className={`w-full px-4 py-2 rounded-full ${buttonClass}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Sign in
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Login;