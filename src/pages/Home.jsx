import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated, config } from 'react-spring';
import { Parallax } from 'react-parallax';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import gifMorning from '../assets/p1.png';
import gifNoon from '../assets/p2.png';
import gifAfternoon from '../assets/p3.png';
import gifEvening from '../assets/p4.png';
import gifNight from '../assets/p5.png';

import PostCard from '../components/Postcard';
import appwriteService from '../appwrite/config';
import { FaUtensils, FaShoppingCart, FaHome, FaBook, FaPlane } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import morningImage1 from '../assets/fast1.png';
import morningImage2 from '../assets/easy1.png';
import morningImage3 from '../assets/free1.png';
import noonImage1 from '../assets/fast2.png';
import noonImage2 from '../assets/easy2.png';
import noonImage3 from '../assets/free2.png';
import afternoonImage1 from '../assets/fast3.png';
import afternoonImage2 from '../assets/easy3.png';
import afternoonImage3 from '../assets/free3.png';
import eveningImage1 from '../assets/fast4.png';
import eveningImage2 from '../assets/easy4.png';
import eveningImage3 from '../assets/free4.png';
import nightImage1 from '../assets/fast5.png';
import nightImage2 from '../assets/free5.png';
import nightImage3 from '../assets/easy5.png';
import a1 from '../assets/a1.png';
import a2 from '../assets/a2.png';
import a3 from '../assets/a3.png';
import a4 from '../assets/a4.png';
import a5 from '../assets/a5.png';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';

const getThemeImage2 = (theme) => {
    switch (theme) {
        case 'morning':
            return a1;
        case 'noon':
            return a2;
        case 'afternoon':
            return a3;
        case 'evening':
            return a4;
        case 'night':
            return a5;
        default:
            return a1;
    }
};
const getThemeImage3 = (theme) => {
    switch (theme) {
        case 'morning':
            return b1;
        case 'noon':
            return b2;
        case 'afternoon':
            return b3;
        case 'evening':
            return b4;
        case 'night':
            return b5;
        default:
            return b1;
    }

};

const Home = () => {
    const theme = useSelector((state) => state.theme.themeMode);
    const [selectedButton, setSelectedButton] = useState('all');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: config.molasses });
    const slideIn = useSpring({ transform: 'translateX(0%)', from: { transform: 'translateX(-100%)' }, config: config.slow });
    const bounceIn = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0)' }, config: config.wobbly });

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

        if (selectedButton !== 'all') {
            filtered = filtered.filter(post => post.Type.toLowerCase() === selectedButton.toLowerCase());
        }

        setFilteredPosts(filtered.slice(0, 6));
    }, [selectedButton, posts]);

    const handleButtonClick = (category) => {
        setSelectedButton(category);
    };

    const getThemeGif = (theme) => {
        switch (theme) {
            case 'morning':
                return gifMorning;
            case 'noon':
                return gifNoon;
            case 'afternoon':
                return gifAfternoon;
            case 'evening':
                return gifEvening;
            case 'night':
                return gifNight;
            default:
                return gifMorning;
        }
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

    const getHighlightedButtonClass = (theme) => {
        switch (theme) {
            case 'morning':
                return 'text-neutral-100 bg-neutral-950 hover:bg-neutral-50 hover:text-neutral-950';
            case 'noon':
                return 'text-neutral-200 bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-800';
            case 'afternoon':
                return 'text-neutral-300 bg-neutral-600 hover:bg-neutral-400 hover:text-neutral-600';
            case 'evening':
                return 'text-neutral-800 bg-neutral-200 hover:bg-neutral-600 hover:text-neutral-200';
            case 'night':
                return 'text-neutral-950 bg-neutral-50 hover:bg-neutral-950 hover:text-neutral-100';
            default:
                return 'text-neutral-50 hover:bg-neutral-950 hover:text-neutral-950';
        }
    };

    const getThemeImage = (theme, index) => {
        const images = {
            morning: [morningImage1, morningImage2, morningImage3],
            noon: [noonImage1, noonImage2, noonImage3],
            afternoon: [afternoonImage1, afternoonImage2, afternoonImage3],
            evening: [eveningImage1, eveningImage2, eveningImage3],
            night: [nightImage1, nightImage2, nightImage3]
        };

        return images[theme][index];
    };

    const getIconForCategory = (category) => {
        switch (category) {
            case 'food':
                return <FaUtensils />;
            case 'shopping':
                return <FaShoppingCart />;
            case 'bills':
                return <FaHome />;
            case 'education':
                return <FaBook />;
            case 'travel':
                return <FaPlane />;
            default:
                return <FiMenu />;
        }
    };

    return (
        <div className={`flex flex-col min-h-screen ${getThemeClass(theme)} md:ml-[20%] md:w-[80%]`}>
            {/* Hero section */}
            <Parallax bgImage="" strength={300}>
                <animated.section style={fadeIn} className="flex-grow flex flex-col md:flex-row justify-center p-4 hero-section">
                    <div className="text-center md:text-left md:w-1/2 flex flex-col justify-center">
                        <h1 className={`font-comfortaa mb-8 text-3xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getHighlightedContainerColors(theme)}`}>MinimaCoupons</h1>
                        <p className="mt-2 md:text-lg hidden md:contents">live minimal spend minimal</p>
                    </div>
                    <div className="flex justify-center md:w-1/2">
                        <animated.img style={slideIn} src={getThemeGif(theme)} alt="Animated GIF" className="w-full max-w-xs md:max-w-full md:h-auto rounded-3xl" />
                    </div>
                </animated.section>
            </Parallax>

            

            {/* Category section */}
            <section className="container mx-auto p-4 category-section md:mt-5 md:mb-5 md:m-2 mt-2">
                <animated.div style={slideIn} className="flex justify-between items-center mb-2">
                    <h3 className="text-3xl font-bold mt-10 mb-10 pb-5 pt-5">Category</h3>
                    <Link to="/all-posts"><span className="text-themeColor font-semibold mr-5">All posts</span></Link>
                </animated.div>
                <animated.div style={fadeIn} className="flex flex-col md:flex-row mb-10">
                    <div className={`flex-shrink-0 p-2 ${getHighlightedContainerColors(theme)} rounded-3xl md:w-1/7 md:mr-4 shadow-lg`}>
                        <div className="flex flex-row md:flex-col md:content-center justify-between h-full space-y-2">
                            {['all', 'food', 'shopping', 'bills', 'education', 'travel'].map((category) => (
                                <button
                                    key={category}
                                    className={`w-10 h-10 flex items-center justify-center ${selectedButton === category ? 'bg-themeColor text-white' : getThemeClass(theme)} rounded-full hover:bg-themeColor hover:text-white transition-transform transform hover:scale-110`}
                                    onClick={() => handleButtonClick(category)}
                                >
                                    {getIconForCategory(category)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-grow md:w-5/6 flex flex-col">
                        {filteredPosts.length === 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <h1 className="text-center mt-16 mb-16 opacity-40 text-2xl">Please login to see the cards</h1>
                            </div>
                        ) : (
                            <>
                                <div className="flex md:hidden overflow-x-auto pb-4 space-x-4">
                                    {filteredPosts.map((post) => (
                                        <div key={post.$id} className="flex-shrink-0 w-60">
                                            <PostCard
                                                $id={post.$id}
                                                title={post.title}
                                                featureimage={post.featureimage}
                                                status={post.status}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                                    {filteredPosts.map((post) => (
                                        <animated.div style={bounceIn} key={post.$id} className="w-full transition-transform transform hover:scale-105">
                                            <PostCard
                                                $id={post.$id}
                                                title={post.title}
                                                featureimage={post.featureimage}
                                                status={post.status}
                                            />
                                        </animated.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </animated.div>
            </section>

            {/* Highlighted container */}
            <animated.div style={fadeIn} className='m-5'>
                <section className={`p-4 ${getHighlightedContainerColors(theme)} rounded-3xl w-full why-minima-container shadow-xl`}>
                    <div className="flex flex-col md:flex-row w-full h-full">
                        <div className="w-full md:w-1/2 p-2 flex flex-col justify-center">
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Why Minima Coupon?</h2>
                            <p className="mt-2">Using coupons can save a significant amount of money. Using coupons can save a significant amount of money.</p>
                            <Link to="/about">
                <button className={`mt-4 w-full ${getNormalButtonClass(theme)} rounded-full py-2 transition-transform transform hover:scale-105`}>
                  Learn more
                </button>
              </Link>
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                            <img src={getThemeImage2(theme)} alt="Theme-based" className="rounded-3xl w-full h-full object-cover " />
                        </div>
                    </div>
                </section>
            </animated.div>

            <animated.div style={fadeIn} className='m-5'>
                <section className={`container mx-auto p-4 flex ${getContainerColors(theme)} flex-col md:flex-row rounded-3xl join-contribute-container shadow-xl`}>
                    <div className="w-full md:w-1/2 p-2">
                        <img src={getThemeImage3(theme)} alt="Theme-based" className="rounded-3xl w-full h-full object-cover " />
                    </div>
                    <div className="w-full md:w-1/2 p-2 flex flex-col justify-center">
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">"Don't be lazy"</h2>
                        <p className="mt-2">Using coupons can save a significant amount of money. Using coupons can save a significant amount of money.</p>
                        <Link to="/add-post">
              <button className={`mt-4 w-full ${getHighlightedButtonClass(theme)} rounded-full py-2 transition-transform transform hover:scale-105`}>
                Contribute
              </button>
              </Link>
                    </div>
                </section>
            </animated.div>

            {/* More sections */}
            {/* Transparent Section */}
            <animated.section style={slideIn} className="container mx-auto p-4 saving-section">
                <div className="flex flex-col md:flex-row bg-transparent rounded-3xl p-4">
                    <div className="w-full md:w-3/5 p-4">
                        <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">Saving</h3>
                        <p className="text-sm">
                            Use our website and save about 100 Rs on each order. This can roughly save you 10,000 Rs a year.
                            Save small, make big! Use our website and save about 100 Rs on each order. This can roughly save you 10,000 Rs a year.
                            Save small, make big! Use our website and save about 100 Rs on each order. This can roughly save you 10,000 Rs a year.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 p-4 md:ml-16 flex items-center justify-center">
                        <div className={`w-full h-full ${getHighlightedContainerColors(theme)} rounded-3xl p-10 flex items-center justify-center shadow-lg`}>
                            <CircularProgressbar
                                value={75}
                                text={`${75}%`}
                                styles={buildStyles({
                                    pathColor: theme === 'morning' ? '#fafafa' :
                                        theme === 'noon' ? '##e5e5e5' :
                                            theme === 'afternoon' ? '#a3a3a3' :
                                                theme === 'evening' ? '#525252' : '#171717',
                                    textColor: theme === 'morning' ? '#fafafa' :
                                        theme === 'noon' ? '#e5e5e5' :
                                            theme === 'afternoon' ? '#a3a3a3' :
                                                theme === 'evening' ? '#525252' : '#171717',
                                    trailColor: theme === 'morning' ? '#0a0a0a' :
                                        theme === 'noon' ? '#171717' :
                                            theme === 'afternoon' ? '#404040' :
                                                theme === 'evening' ? '#a3a3a3' : '#e5e5e5',
                                    backgroundColor: 'transparent',
                                })}
                            />
                        </div>
                    </div>
                </div>
            </animated.section>
        </div>
    );
};

export default Home;