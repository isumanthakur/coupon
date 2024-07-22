import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn({ theme, onClick }) {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            if (onClick) onClick();
        });
    };

    const getThemeClass = (theme) => {
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

    return (
        <button
            className={`inline-block px-6 py-2 duration-200 rounded-full ${getThemeClass(theme)}`}
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
