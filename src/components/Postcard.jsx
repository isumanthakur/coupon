import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';
import './PostCard.css'; // Assuming you will add the CSS for gradient glow here

function PostCard({ $id, title, featureimage, status, statusChangedAt }) {
    const [copied, setCopied] = useState(false);
    const [countdown, setCountdown] = useState(null); // State to store countdown timer
    const theme = useSelector((state) => state.theme.themeMode);

    const themeIndexMap = {
        morning: 0,
        night: 1,
        noon: 2,
        afternoon: 3,
        evening: 4,
    };

    useEffect(() => {
        console.log('PostCard Props:', { $id, title, featureimage, status, statusChangedAt });
    }, [$id, title, featureimage, status, statusChangedAt]);

    const handleCopy = (e) => {
        e.stopPropagation(); // Prevent the Link click event
        e.preventDefault(); // Prevent the default behavior
        navigator.clipboard.writeText($id); // Example: Copying $id instead of couponCode
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        // Calculate countdown timer if status is 'expired' and statusChangedAt is set
        if (status === 'expired' && statusChangedAt) {
            const expiryDate = new Date(statusChangedAt);
            expiryDate.setHours(expiryDate.getHours() + 24); // Example: Expires in 24 hours

            const interval = setInterval(() => {
                const now = new Date();
                const diff = expiryDate - now;

                if (diff <= 0) {
                    clearInterval(interval);
                    setCountdown(null);
                } else {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    setCountdown(`${hours}:${minutes}:${seconds}`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [status, statusChangedAt]);

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
        <Link to={`/post/${$id}`} className="block w-full max-w-4xl mx-auto p-2">
            <div className={`flex flex-col sm:flex-row w-full h-auto sm:h-48 rounded-xl overflow-hidden ${getThemeClass(theme)} transition hover:bg-opacity-90`}>
                <div className="w-full sm:w-1/2 h-48 sm:h-full">
                    {featureimage && featureimage.length > 0 && (
                        <img src={featureimage[themeIndexMap[theme]]} alt={title} className='w-full h-full object-cover rounded-xl sm:rounded-none' />
                    )}
                </div>
                <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
                    <h2 className='text-xl font-bold mb-2'>{title}</h2>
                    <span className={`text-sm font-medium ${status === 'active' ? 'text-neutral-500' : 'text-neutral-950'}`}>
                        {status === 'active' ? 'Active' : 'Expires in '}
                    </span>
                    {/* Display countdown timer if available */}
                    {status === 'expired' && countdown && (
                        <p className="text-xs text-gray-500 mt-1">
                            {countdown}
                        </p>
                    )}
                    <div className='flex items-center justify-between mt-2'>
                        <span
                            className={`text-sm cursor-pointer relative ${copied ? 'gradient-glow' : ''}`}
                            onClick={handleCopy}
                        >
                              <FaRegCopy className="text-lg cursor-pointer" onClick={handleCopy} /> {`${$id}`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;