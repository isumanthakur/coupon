import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
    const theme = useSelector((state) => state.theme.themeMode);

    const getThemeClass = (theme) => {
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

    return (
        <footer className={`py-8 ${getThemeClass(theme)}`}>
            <div className="container mx-auto px-4 md:ml-[20%] md:w-[80%]">
                {/* Company Name */}
                <h2 className="text-2xl font-comfortaa font-bold">MinimaCoupon<sup>&copy;</sup></h2>
                
                <div className="flex flex-wrap mt-4">
                    {/* Left Side */}
                    <div className="w-full md:w-2/5 flex justify-between mt-8 md:mt-0">
                        <div className="w-full sm:w-1/2 mt-4">
                            <ul className="space-y-2">
                                <li><a href="https://www.instagram.com" className="text-sm">Instagram</a></li>
                                <li><a href="https://www.youtube.com" className="text-sm">YouTube</a></li>
                                <li><a href="https://www.twitter.com" className="text-sm">X (formerly Twitter)</a></li>
                                <li><a href="https://www.facebook.com" className="text-sm">Facebook</a></li>
                            </ul>
                        </div>
                        <div className="w-full sm:w-1/2 mt-4">
                            <ul className="space-y-2">
                                <li><Link to="/privacy-policy" className="text-sm">Privacy Policy</Link></li>
                                <li><Link to="/terms-conditions" className="text-sm">Terms & Conditions</Link></li>
                                <li><Link to="/cookies-policy" className="text-sm">Cookies Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full h-0.5 my-4 bg-gray-300 opacity-50 rounded md:hidden"></div>
                    <div className="hidden md:block w-0.5 bg-gray-300 opacity-50 rounded mx-4"></div>
                    {/* Right Side */}
                    <div className="w-full md:w-2/5 flex justify-between mt-8 md:mt-0">
                        <div>
                            <h3 className="font-comfortaa font-bold">Company</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li><Link to="/who-we-are">Who we are</Link></li>
                                <li><Link to="/stories-insight">Stories & Insight</Link></li>
                                <li><Link to="/beta-program">Beta program</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-comfortaa font-bold">Learn & Support</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li><Link to="/help-center">Help Center</Link></li>
                                <li><Link to="/discussion">Discussion</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
