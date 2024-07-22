import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

// Import images for each theme
import morningImage from '../assets/contact1.png';
import nightImage from '../assets/contact5.png';
import noonImage from '../assets/contact2.png';
import afternoonImage from '../assets/contact3.png';
import eveningImage from '../assets/contact4.png';

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

const Contact = () => {
    const theme = useSelector((state) => state.theme.themeMode);
    const themeImage = imageGallery[theme] || imageGallery['morning'];
    const inputClass = getInputClass(theme);
    const buttonClass = getNormalButtonClass(theme);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_m5ulxxhhbhvbhbh', 'template_wyy30ca', e.target, '8u8fC_YlLW-yxjc3C')
            .then((result) => {
                console.log(result.text);
                alert('Message sent successfully!');
            }, (error) => {
                console.log(error.text);
                alert('Failed to send message. Please try again later.');
            });

        e.target.reset();
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
                className={`flex flex-col h-1/2 md:h-screen justify-between p-8 w-full md:w-1/2 ${getHighlightedContainerColors(theme)} rounded-t-3xl md: rounded-none `}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="max-w-md mx-auto w-full">
                    <h1 className="text-4xl p-5 font-bold mb-6">Contact Us</h1>
                </div>
                <div className="max-w-md mx-auto w-full mt-auto">
                    <form className="space-y-6" onSubmit={sendEmail}>
                        <motion.div 
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                className={`mt-1 p-2 block w-full border-2 bg-transparent ${inputClass} rounded-2xl`}
                                required
                            />
                        </motion.div>
                        <motion.div 
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className={`mt-1 p-2 block w-full border-2  bg-transparent ${inputClass} rounded-2xl`}
                                required
                            />
                        </motion.div>
                        <motion.div 
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <textarea
                                id="message"
                                name="message"
                                rows="2"
                                placeholder="Message"
                                className={`mt-1 p-1 block w-full bg-transparent border-2  ${inputClass} rounded-2xl`}
                                required
                            ></textarea>
                        </motion.div>
                        <motion.button 
                            type="submit"
                            className={`w-full px-4 py-2 rounded-full ${buttonClass}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Contact;