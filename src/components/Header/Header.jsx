import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { morningMode, nightMode, noonMode, afternoonMode, eveningMode } from '../../store/themeSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Container, LogoutBtn } from '../index';
import './Header.css'; // Import the CSS file for animations

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const theme = useSelector((state) => state.theme.themeMode);
    const [menuOpen, setMenuOpen] = useState(false);
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const dispatch = useDispatch();
    const themeMenuTimer = useRef(null);

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Coupon', slug: '/all-posts', active: true },
        { name: 'Create', slug: '/add-post', active: authStatus },
        { name: 'About', slug: '/about', active: true },
        { name: 'Contact', slug: '/contact', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
    ];

    const toggleMenu = () => {
        if (menuOpen) {
            setMenuClosing(true);
            setTimeout(() => {
                setMenuOpen(false);
                setMenuClosing(false);
            }, 500); // match with CSS animation duration
        } else {
            setMenuOpen(true);
        }
    };

    const toggleThemeMenu = () => {
        setThemeMenuOpen(!themeMenuOpen);
        if (!themeMenuOpen) {
            startThemeMenuTimer();
        } else {
            clearThemeMenuTimer();
        }
    };

    const startThemeMenuTimer = () => {
        clearThemeMenuTimer();
        themeMenuTimer.current = setTimeout(() => {
            setThemeMenuOpen(false);
        }, 5000); // 5 seconds
    };

    const clearThemeMenuTimer = () => {
        if (themeMenuTimer.current) {
            clearTimeout(themeMenuTimer.current);
            themeMenuTimer.current = null;
        }
    };

    const setTheme = (theme) => {
        switch (theme) {
            case 'morning':
                dispatch(morningMode());
                break;
            case 'noon':
                dispatch(noonMode());
                break;
            case 'afternoon':
                dispatch(afternoonMode());
                break;
            case 'evening':
                dispatch(eveningMode());
                break;
            case 'night':
                dispatch(nightMode());
                break;
            default:
                dispatch(morningMode());
        }
        startThemeMenuTimer(); // Restart the timer to keep the menu open
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [menuOpen]);

    useEffect(() => {
        if (themeMenuOpen) {
            startThemeMenuTimer();
        } else {
            clearThemeMenuTimer();
        }
    }, [themeMenuOpen]);

    const getMainPageThemeClass = (theme) => {
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

    const getButtonClass = (theme, active) => {
        const baseClass = 'hover:bg-opacity-30';
        const activeClass = active ? 'bg-opacity-20' : 'bg-opacity-0';
        switch (theme) {
            case 'morning':
                return `bg-neutral-200 ${baseClass} ${activeClass}`;
            case 'night':
                return `bg-neutral-900 ${baseClass} ${activeClass}`;
            case 'noon':
                return `bg-neutral-400 ${baseClass} ${activeClass}`;
            case 'afternoon':
                return `bg-neutral-500 ${baseClass} ${activeClass}`;
            case 'evening':
                return `bg-neutral-900 ${baseClass} ${activeClass}`;
            default:
                return `bg-neutral-200 ${baseClass} ${activeClass}`;
        }
    };

    const themeIcons = {
        morning: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
        noon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        afternoon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        evening: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="2" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        night: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="14" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                
            </svg>
        ),
    };
    
  
    

    return (
        <header className={`py-3 shadow ${getMainPageThemeClass(theme)} md:h-screen md:w-1/5 md:fixed md:top-0 md:left-0`}>
            <Container>
                <nav className="flex items-center justify-between relative md:flex-col md:h-full">
                    {/* Hamburger Menu - Mobile View */}
                    <div className="flex items-center justify-between md:hidden w-full">
    <button onClick={toggleMenu} className="focus:outline-none rounded-full p-2 z-30">
        <svg className={`h-6 w-6 transition-transform ${menuOpen ? 'rotate-30' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16"} />
        </svg>
    </button>
    <div className="flex items-center ml-auto space-x-4">
        <button onClick={toggleThemeMenu} className="focus:outline-none rounded-full mb-1 p-2 z-10">
            {themeIcons[theme]}
        </button>
        <Link to="/">
            <div className="w-5 h-5 sm:w-6 sm:h-6 text-xl mb-3 font-bold">M</div>
        </Link>
    </div>

    {themeMenuOpen && (
        <div className={`absolute right-0 top-12 flex bg-transparent rounded-full shadow-lg z-20 theme-menu ${themeMenuOpen ? 'show' : 'hide'}`}>
            {Object.keys(themeIcons).map((themeKey) => (
                <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className={`block text-center p-1 sm:p-2 duration-200 rounded-full bg-transparent ${getButtonClass(themeKey, theme === themeKey)}`}
                >
                    {themeIcons[themeKey]}
                </button>
            ))}
        </div>
    )}
</div>


                    {/* Theme Toggle Buttons and Hamburger Menu - Desktop View */}
                    <div className="hidden md:flex items-center rounded-3xl justify-center md:flex-col">
                        <div className="relative mb-4">
                            <button onClick={toggleThemeMenu} className="focus:outline-none rounded-full mt-5 mb-7 p-2 mx-1">
                                {themeIcons[theme]}
                            </button>
                            {themeMenuOpen && (
                                <div className={`absolute top-full flex flex-col bg-transparent rounded-full shadow-lg z-20 theme-menu ${themeMenuOpen ? 'show' : 'hide'}`}>
                                    {Object.keys(themeIcons).map((themeKey) => (
                                        <button
                                            key={themeKey}
                                            onClick={() => setTheme(themeKey)}
                                            className={`block text-center p-1 sm:p-2 duration-200 rounded-full bg-transparent ${getButtonClass(themeKey, theme === themeKey)}`}
                                        >
                                            {themeIcons[themeKey]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <ul className={`flex flex-col items-center flex-grow justify-center ${themeMenuOpen ? 'nav-links-move-down' : 'nav-links-move-up'}`}>
                            {navItems.map(
                                (item) =>
                                    item.active && (
                                        <li key={item.name} className="mb-20">
                                            <button
                                                onClick={() => navigate(item.slug)}
                                                className={`inline-block px-6 py-2 duration-200 rounded-3xl ${getMainPageThemeClass(theme)} ${getButtonClass(theme)}`}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    )
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn theme={theme} />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>

                {menuOpen && (
                    <div className={`md:hidden fixed inset-0 ${getMainPageThemeClass(theme)} p-4 z-20 h-screen overflow-hidden ${menuClosing ? 'slide-out-to-top' : 'slide-in-from-top'}`}>
                        <ul className="h-full mt-10 flex flex-col justify-center items-center">
                            {navItems.map(
                                (item, index) =>
                                    item.active && (
                                        <li key={item.name} className={`mb-4 animate-fade-in ${menuClosing ? 'animate-fade-out' : `delay-${index * 100}`}`}>
                                            <button
                                                onClick={() => {
                                                    navigate(item.slug);
                                                    toggleMenu();
                                                }}
                                                className={`block px-4 py-2 duration-200 rounded-3xl ${getMainPageThemeClass(theme)} ${getButtonClass(theme)}`}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    )
                            )}
                            {authStatus && (
                                <li className={`mb-4 animate-fade-in ${menuClosing ? 'animate-fade-out' : `delay-${navItems.length * 100}`}`}>
                                    <LogoutBtn theme={theme} onClick={toggleMenu} />
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;