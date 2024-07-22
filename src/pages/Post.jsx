import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import generateTerms from "../services/huggingFaceService"; // Ensure correct import
import './Post.css'

const getThemeClass = (theme) => {
    switch (theme) {
        case 'morning':
            return 'bg-neutral-50 text-neutral-950';
        case 'night':
            return 'bg-neutral-900 text-neutral-100';
        case 'noon':
            return 'bg-neutral-200 text-neutral-800';
        case 'afternoon':
            return 'bg-neutral-400 text-neutral-700';
        case 'evening':
            return 'bg-neutral-600 text-neutral-300';
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
            return 'bg-neutral-500 text-neutral-400';
        case 'evening':
            return 'bg-neutral-400 text-neutral-600';
        case 'night':
            return 'bg-neutral-200 text-neutral-900';
        default:
            return 'bg-white text-black';
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

export default function Post() {
    const [post, setPost] = useState(null);
    const [terms, setTerms] = useState("");
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const theme = useSelector((state) => state.theme.themeMode);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    const themeIndexMap = {
        morning: 0,
        night: 1,
        noon: 2,
        afternoon: 3,
        evening: 4
    };

    useEffect(() => {
        console.log('Slug:', slug);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log('Post:', post);
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        console.log('User Data:', userData);
        console.log('Is Author:', isAuthor);
    }, [userData, isAuthor]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                navigate("/");
            }
        });
    };

    const handleGenerateTerms = async () => {
        setLoading(true);
        try {
            const input = {
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                description: post.description || "",
                status: post.status || "",
                Type: post.Type || "",
                expiry: post.expdate ? new Date(post.expdate).toLocaleDateString() : ""
            };

            const generatedTerms = await generateTerms(input);
            setTerms(generatedTerms);
        } catch (error) {
            console.error("Error generating terms:", error);
            setTerms("An error occurred while generating terms.");
        }
        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(post.$id);
        document.getElementById("postId").classList.add("rainbow-animation");
        setTimeout(() => {
            document.getElementById("postId").classList.remove("rainbow-animation");
        }, 2000);
    };

    return post ? (
        <div className={`flex flex-col justify-center items-center min-h-screen ${getThemeClass(theme)} p-4 md:ml-[20%] md:w-[80%]`}>
            <div className={`w-full h-auto md:w-4/5 ${getContainerColors(theme)} rounded-3xl shadow-md m-4 p-4`} style={{ margin: '5%' }}>
                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 w-full flex justify-center items-center">
                        {post.featureimage && post.featureimage.length > 0 && (
                            <img
                                src={post.featureimage[themeIndexMap[theme]]}
                                alt={post.title}
                                className="w-full h-auto object-cover rounded-lg"
                                style={{ maxHeight: "80vh" }}
                            />
                        )}
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col p-4 h-full">
                        <div className={`p-4 ${getHighlightedContainerColors(theme)} flex justify-between items-center rounded-lg`}>
                            <p id="postId" className="text-xl font-bold">{post.$id}</p>
                            <button onClick={handleCopy} className="border border-dashed p-2 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8m-4-4v8m-4-4h8m-4-4v8m-4-4h8m-4-4v8" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 mb-4">
                            <h3 className="text-xl flex justify-center items-center font-bold">{post.title}</h3>
                            <div className="flex flex-col md:flex-row justify-between items-center mt-2">
                                <span className={`py-2 px-4 text-center ${theme === "night" ? "bg-neutral-100" : "bg-black text-white"} rounded-md md:mr-2`}>{post.status}</span>
                                <p className="md:mt-0 mt-2">{post.expdate ? new Date(post.expdate).toLocaleDateString() : ""}</p>
                            </div>
                        </div>
                        <div className="flex-grow overflow-auto">
                            <p>{parse(post.description || "This GPT is new and needs to be trained. Input from it might not make sense.")}</p>
                            <textarea
                                className="w-full h-32 md:h-full bg-transparent border border-gray-300 rounded-lg outline-none p-4 mt-4"
                                placeholder="Help AI to generate terms and conditions...(this GPT model is newly created to the generated text might not make sense )"
                                style={{ resize: "none" }}
                                value={terms}
                                onChange={(e) => setTerms(e.target.value)}
                            ></textarea>
                            <div className="flex justify-center mt-4">
                                <button
                                    className="p-3 rounded-full bg-blue-500 text-white glow-on-hover"
                                    onClick={handleGenerateTerms}
                                    disabled={loading}
                                >
                                    {loading ? "Generating..." : "Generate with GPT"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAuthor && (
                <div className="flex justify-evenly mt-4 w-full md:w-4/5">
                    <Link to={`/edit-post/${post.$id}`} className={`p-3 rounded-3xl ${getHighlightedButtonClass(theme)}`}>
                        Update
                    </Link>
                    <button onClick={deletePost} className={`p-3 rounded-3xl ${getHighlightedButtonClass(theme)}`}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    ) : null;
}