import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/auth/hooks/auth-hook';
import './userMenu.css'
import { Link } from 'react-router-dom';

const DEFAULT_AVATAR = "http://localhost:8000/storage/profile/default/customer1.jpg";

export const UserMenu = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);    
    const closeMenu = () => {
        setOpen(false);
    }

    useEffect(() => {
        const handleClickoutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickoutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickoutside);
            document.removeEventListener("keydown", handleEscape);
        }
    }, [])
    
    const avatarUrl = user?.avatar ? user['avatar'] : DEFAULT_AVATAR;
    console.log(user);
    
    return (
        <div className='user-menu' ref={menuRef}>
            <button className='user-menu-button' onClick={() => setOpen(prev => !prev)}>
                <img 
                    src={avatarUrl} 
                    alt={user?.fullname || "Guest"}
                    className='user-avatar'
                    onError={(e) => {
                        e.target.src = DEFAULT_AVATAR
                    }}
                />
            </button>

            {open && (
                <div className='user-dropdown'>
                    {isAuthenticated ? (
                        <>
                            <div className='user-info'>
                                <span className='user-name'>
                                    {user.fullname}
                                </span>
                                <span className='user-email'>
                                    {user.email}
                                </span>
                            </div>

                            <hr />
                            <Link to="/profile" className='dropdown-item' onClick={closeMenu}>
                                My Profile
                            </Link>
                            <Link to="/settings" className='dropdown-item' onClick={closeMenu}>
                                Settings
                            </Link>
                            <button className='dropdown-item logout' onClick={
                                () => {
                                    logout();
                                    closeMenu();
                                }
                            }>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <span className='user-info'>
                                    WELCOME!
                                </span>

                                <span className='user-email'>
                                    Please Sign in first.
                                </span>

                                <hr />

                            <Link to="/login" className='dropdown-item'>
                                Sign In
                            </Link>
                            <Link to="/register" className='dropdown-item'>
                                Register
                            </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};