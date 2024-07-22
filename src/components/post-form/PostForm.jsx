import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    BsFillBasketFill,
    BsFillCartFill,
    BsFillHouseFill,
    BsFillBookFill,
    BsFillBriefcaseFill
} from "react-icons/bs";
import { motion } from 'framer-motion';

// Import images for each theme
import image1Light from "../../assets/ani1.png";
import image1Dark from "../../assets/ani5.png";
import image1Third from "../../assets/ani2.png";
import image1Fourth from "../../assets/ani3.png";
import image1Fifth from "../../assets/ani4.png";

import image2Light from "../../assets/snor1.png";
import image2Dark from "../../assets/snor5.png";
import image2Third from "../../assets/snor2.png";
import image2Fourth from "../../assets/snor3.png";
import image2Fifth from "../../assets/snor4.png";

import image3Light from "../../assets/ghost1.png";
import image3Dark from "../../assets/ghost5.png";
import image3Third from "../../assets/ghost2.png";
import image3Fourth from "../../assets/ghost3.png";
import image3Fifth from "../../assets/ghost4.png";


const imageGallery = {
    all: {
        morning: [image1Light, image2Light,image3Light],
        night: [image1Dark, image2Dark,image3Dark],
        noon: [image1Third, image2Third,image3Third],
        afternoon: [image1Fourth, image2Fourth,image3Fourth],
        evening: [image1Fifth, image2Fifth,image3Fifth],
    },
    food: {
        morning: [image2Light, image1Light,image3Light ],
        night: [image2Dark, image1Dark,image3Dark],
        noon: [image2Third, image1Third,image3Dark],
        afternoon: [image2Fourth, image1Fourth,image3Fourth],
        evening: [image2Fifth, image1Fifth,image3Fourth],
    },
    
    shopping: {
        morning: [image1Light, image3Light,image2Light],
        night: [image1Dark, image3Dark,image2Dark],
        noon: [image1Third, image3Third,image2Third],
        afternoon: [image1Fourth, image3Fourth,image2Fourth],
        evening: [image1Fifth, image3Fifth,image2Fifth],
    },
    bills: {
        morning: [image3Light, image2Light,image1Light],
        night: [image3Dark, image2Dark,image1Dark],
        noon: [image3Third, image2Third,image1Third],
        afternoon: [image3Fourth, image2Fourth,image1Fourth],
        evening: [image3Fifth, image2Fifth,image1Fifth],
    },
    education: {
        morning: [image1Light, image2Light,image3Light],
        night: [image1Dark, image2Dark,image3Dark],
        noon: [image1Third, image2Third,image3Third],
        afternoon: [image1Fourth, image2Fourth,image3Fourth],
        evening: [image1Fifth, image2Fifth,image3Fifth],
    },
    travel: {
        morning: [image2Light, image1Light,image3Light],
        night: [image2Dark, image1Dark,image3Dark],
        noon: [image2Third, image1Third,image3Third],
        afternoon: [image2Fourth, image1Fourth,image3Fourth],
        evening: [image3Fifth, image2Fifth,image3Fifth],
    },
};

const getThemeClass = (theme) => {
    switch (theme) {
        case 'morning':
            return 'bg-neutral-100 text-neutral-950';
        case 'night':
            return 'bg-neutral-950 text-neutral-100';
        case 'noon':
            return 'bg-neutral-300 text-neutral-800';
        case 'afternoon':
            return 'bg-neutral-400 text-neutral-700';
        case 'evening':
            return 'bg-neutral-800 text-neutral-300';
        default:
            return 'bg-neutral-100 text-neutral-950';
    }
};

const getRightFormThemeClass = (theme) => {
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

const getButtonClass = (theme, isSelected) => {
    const baseClass = 'rounded-full px-4 py-2';
    switch (theme) {
        case 'morning':
            return isSelected ? `${baseClass} bg-black text-white` : `${baseClass} text-black bg-neutral-200`;
        case 'night':
            return isSelected ? `${baseClass} bg-white text-black` : `${baseClass} text-white bg-neutral-800`;
        case 'noon':
            return isSelected ? `${baseClass} bg-black text-white` : `${baseClass} text-black bg-neutral-300`;
        case 'afternoon':
            return isSelected ? `${baseClass} bg-black text-white` : `${baseClass} text-black bg-neutral-400`;
        case 'evening':
            return isSelected ? `${baseClass} bg-black text-white` : `${baseClass} text-black bg-neutral-800`;
        default:
            return isSelected ? `${baseClass} bg-black text-white` : `${baseClass} text-black bg-neutral-200`;
    }
};

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            description: post?.description || "",
            status: post?.status || "active",
            Type: post?.Type || "all",
            expiry: post?.expiry || ""
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [selectedImage, setSelectedImage] = useState(post?.featureimage || []);
    const [loading, setLoading] = useState(true); // Add this line
    const [category, setCategory] = useState(post?.Type || 'all');
    const theme = useSelector((state) => state.theme.themeMode);
    const [status, setStatus] = useState(post?.status || "active");

    useEffect(() => {
        register("status");
    }, [register]);

    const handleImageSelect = (imageIndex) => {
        const selectedImages = [
            imageGallery[category].morning[imageIndex],
            imageGallery[category].night[imageIndex],
            imageGallery[category].noon[imageIndex],
            imageGallery[category].afternoon[imageIndex],
            imageGallery[category].evening[imageIndex]
        ];
        setSelectedImage(selectedImages);
        setLoading(false); // Stop displaying the loading GIF when an image is selected
        setValue("featureimage", selectedImages);
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    const submit = async (data) => {
        console.log("Submitting form with data:", data);
        if (!userData || !userData.$id) {
            console.error("User data is not loaded.");
            return;
        }

        try {
            if (post) {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featureimage: selectedImage,
                    userId: userData.$id,
                    expdate: data.expiry,
                    description: data.description
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    slug: slugTransform(data.content),
                    featureimage: selectedImage,
                    expdate: data.expiry,
                    description: data.description
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting the form: ", error);
        }
    };

    const onChangeCategory = (selectedCategory) => {
        setCategory(selectedCategory);
        setValue("Type", selectedCategory);
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <motion.form
            onSubmit={handleSubmit(submit)}
            className={`flex flex-col md:flex-row min-h-screen ${getThemeClass(theme)} p-4  md:ml-[20%] md:w-[80%]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div 
                className={`w-full md:w-2/5 p-1 md:p-11  ${getThemeClass(theme)} rounded-tl-3xl rounded-bl-3xl md:rounded-none md:rounded-l-3xl`}
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="h-full flex flex-col justify-between">
                    <div className="rounded-3xl">
                        <div className="text-center mb-5">
                            <h1 className="text-xs font-comfortaa font-bold">MinimaCoupon</h1>
                        </div>
                        <h2 className="text-5xl text-center font-bold mb-10">Create Post</h2>
                        <div className="mb-14 rounded-lg">
                            <h3 className="text-lg font-bold mb-6">Category</h3>
                            <div className="flex flex-wrap gap-2">
                                {['all', 'food', 'shopping', 'bills', 'education', 'travel'].map((cat) => (
                                    <motion.button
                                        key={cat}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onChangeCategory(cat);
                                        }}
                                        className={`flex items-center justify-center w-12 h-12 md:w-auto md:h-auto px-4 py-2 rounded-full md:rounded-3xl ${getButtonClass(theme, category === cat)} transition duration-300 ease-in-out transform hover:scale-105`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {cat === 'all' && <BsFillBasketFill className="text-lg md:text-base" />}
                                        {cat === 'food' && <BsFillBasketFill className="text-lg md:text-base" />}
                                        {cat === 'shopping' && <BsFillCartFill className="text-lg md:text-base" />}
                                        {cat === 'bills' && <BsFillHouseFill className="text-lg md:text-base" />}
                                        {cat === 'education' && <BsFillBookFill className="text-lg md:text-base" />}
                                        {cat === 'travel' && <BsFillBriefcaseFill className="text-lg md:text-base" />}
                                        <span className="hidden md:inline ml-2 capitalize">{cat}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        <div className={`p-3 mb-10 rounded-3xl ${getRightFormThemeClass(theme)}`}>
                            <h3 className="text-lg font-bold mb-3">Expiry</h3>
                            <Input type="date" className="w-full bg-transparent border-b border-gray-800" {...register("expiry")} />
                        </div>
                        <div className="mb-10">
                            <h3 className="text-lg font-bold mb-10">Image Gallery</h3>
                            <div className="flex flex-wrap">
                                {imageGallery[category][theme].map((image, index) => (
                                    <motion.img
                                        key={index}
                                        src={image}
                                        alt={`Image ${index}`}
                                        className={`rounded-lg cursor-pointer mx-2 mb-2 ${selectedImage.includes(image) ? 'border-2 border-black' : ''} transition duration-300 ease-in-out transform hover:scale-105`}
                                        style={{ width: "80px", height: "auto" }}
                                        onClick={() => handleImageSelect(index)}
                                        whileHover={{ scale: 1.1 }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-10">
                            <h3 className="text-lg font-bold mb-3">Status</h3>
                            <div className="flex">
                                <motion.button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setValue("status", "active", { shouldDirty: true });
                                        setStatus("active");
                                    }}
                                    className={`flex-1 px-4 py-2 mr-5 rounded-full ${getButtonClass(theme, status === "active")} transition duration-300 ease-in-out transform hover:scale-105`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Active
                                </motion.button>
                                <motion.button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setValue("status", "expired", { shouldDirty: true });
                                        setStatus("expired");
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-full ${getButtonClass(theme, status === "expired")} transition duration-300 ease-in-out transform hover:scale-105`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Expired
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div 
                className={`w-full md:w-3/5 p-6 md:h-1/3 md:p-10 rounded-l-none md:rounded-3xl shadow-lg flex flex-col ${getRightFormThemeClass(theme)}`}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className="w-full mb-6 rounded-3xl overflow-hidden"
                    style={{ height: '33%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {loading ? (
                       <div className="h-96 bg-transparent" ></div>
                    ) : (
                        <img
                            src={selectedImage[0]}
                            alt="Selected"
                            className="w-full h-full object-cover"
                        />
                    )}
                </motion.div>

                <Input
                    className="mb-5 bg-transparent border-b border-gray-800"
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                />
                <Input
                    className="mb-5 bg-transparent border-b border-gray-800"
                    type="text"
                    placeholder="Coupon Code"
                    {...register("content")}
                />
                <textarea
                    className="mb-5 bg-transparent border-b border-gray-800 h-32"
                    placeholder="Description"
                    {...register("description")}
                />
                <motion.button 
                    type="submit" 
                    className="mt-6 px-4 py-2 bg-black text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Submit
                </motion.button>
            </motion.div>
        </motion.form>
    );
}