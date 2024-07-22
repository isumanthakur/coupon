import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { FaUtensils, FaShoppingCart, FaHome, FaBook, FaPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const themeImages = {
    
};

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const theme = useSelector((state) => state.theme.themeMode);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await appwriteService.getPosts([]);
                if (result) {
                    setPosts(result.documents);
                    setFilteredPosts(result.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        let filtered = posts;

        if (searchQuery.trim()) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.Type.toLowerCase() === selectedCategory.toLowerCase());
        }

        setFilteredPosts(filtered);
    }, [searchQuery, posts, selectedCategory]);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
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

    const getButtonThemeClass = (theme, isSelected) => {
        const baseClass = 'px-2 py-1 sm:px-4 sm:py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base';
        switch (theme) {
            case 'morning':
                return isSelected ? `${baseClass} text-neutral-100 bg-neutral-950 hover:bg-neutral-50 hover:text-neutral-950` : `${baseClass} bg-gray-200 text-black`;
            case 'noon':
                return isSelected ? `${baseClass} text-neutral-200 bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-800` : `${baseClass} bg-gray-200 text-black`;
            case 'afternoon':
                return isSelected ? `${baseClass} text-neutral-300 bg-neutral-600 hover:bg-neutral-400 hover:text-neutral-600` : `${baseClass} bg-gray-200 text-black`;
            case 'evening':
                return isSelected ? `${baseClass} text-neutral-800 bg-neutral-200 hover:bg-neutral-600 hover:text-neutral-200` : `${baseClass} bg-gray-200 text-black`;
            case 'night':
                return isSelected ? `${baseClass} text-neutral-950 bg-neutral-50 hover:bg-neutral-950 hover:text-neutral-100` : `${baseClass} bg-gray-200 text-black`;
            default:
                return isSelected ? `${baseClass} text-neutral-50 hover:bg-neutral-950 hover:text-neutral-950` : `${baseClass} bg-gray-200 text-black`;
        }
    };

    const getIconForCategory = (category) => {
        switch (category) {
            case 'food':
                return <FaUtensils className="block sm:hidden" />;
            case 'shopping':
                return <FaShoppingCart className="block sm:hidden" />;
            case 'bills':
                return <FaHome className="block sm:hidden" />;
            case 'education':
                return <FaBook className="block sm:hidden" />;
            case 'travel':
                return <FaPlane className="block sm:hidden" />;
            default:
                return <FiMenu className="block sm:hidden" />;
        }
    };

    return (
        <motion.div
            className={`flex flex-col min-h-screen ${getThemeClass(theme)} md:ml-[20%] md:w-[80%] p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Container className="flex-grow">
                {/* Top Image Card */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.05 }}
                >
                    
                </motion.div>
                {/* Buttons and Search Bar */}
                <div className="flex flex-wrap justify-between items-center mb-8 w-full mx-auto">
                    {!showSearch && (
                        <>
                            <div className="flex justify-between flex-grow space-x-1 sm:space-x-4">
                                {['all', 'food', 'shopping', 'bills', 'education', 'travel'].map((category) => (
                                    <motion.button
                                        key={category}
                                        className={getButtonThemeClass(theme, selectedCategory === category)}
                                        onClick={() => handleCategoryClick(category)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {getIconForCategory(category)}
                                        <span className="hidden sm:inline">{category}</span>
                                    </motion.button>
                                ))}
                            </div>
                            <div className="border-l-2 h-6 mx-2" style={{ borderColor: theme === 'night' ? 'white' : 'black' }}></div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <FiSearch className={`cursor-pointer ${theme === 'night' ? 'text-white' : 'text-black'}`} onClick={toggleSearch} />
                            </motion.div>
                        </>
                    )}
                    {showSearch && (
                        <motion.div
                            className="flex justify-center relative w-full"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <input 
                                type="text" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                placeholder="Just write in to Search" 
                                className={`w-full px-4 py-2 bg-transparent border-0 border-b-2 ${theme === 'night' ? 'border-white' : 'border-black'} outline-none`}
                            />
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <FiMenu className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'night' ? 'text-white' : 'text-black'}`} onClick={toggleSearch} />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
                {/* Post Cards */}
                {filteredPosts.length === 0 ? (
                    <h1 className="text-center w-full mt-20 text-2xl">Please login to see the cards</h1>
                ) : (
                    <motion.div 
                        className="flex flex-wrap mt-8 -m-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.$id}
                                className="p-2 w-full md:w-1/2 lg:w-1/3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                            >
                                <PostCard
                                    $id={post.$id}
                                    title={post.title}
                                    featureimage={post.featureimage}
                                    status={post.status}
                                    category={post.Type}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </Container>
        </motion.div>
    );
}

export default AllPosts;