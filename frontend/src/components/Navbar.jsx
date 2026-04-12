import React, { useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import img1 from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from 'lucide-react';
import axios from "axios";
import { clearStoredAuth, getStoredToken } from "../utils/auth";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api`;

const Navbar = ({ user: propUser, onLogout }) => {
    const navigate = useNavigate();
    const menuRef = React.useRef(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [user, setUser] = React.useState(propUser || {
        name: "",
        email: ""
    });

    //  to fetch the user data from server
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getStoredToken();
                if (!token) return;

                const response = await axios.get(`${BASE_URL}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Handle the response if needed
                const userData = response.data.user || response.data;
                setUser(userData);
            }

            catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        if (!propUser) {
            fetchUserData();
        }
    }, [propUser]);


    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleLogout = () => {
        setMenuOpen(false);
        clearStoredAuth();
        onLogout?.();
        navigate("/login");
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <header className={navbarStyles.header}>
            <div className={navbarStyles.container}>
                {/* logo */}
                <div
                    onClick={() => navigate("/")}
                    className={navbarStyles.logoContainer}

                >

                    {/* Elementos del logo fuera del logoContainer según la imagen */}
                    <div className={navbarStyles.logoImage}>
                        <img src={img1} alt="logo" />
                    </div>
                    <span className={navbarStyles.logoText}>Expense Tracker</span>
                </div>

                {/* if user is present */}
                {user && (
                    <div className={navbarStyles.userContainer} ref={menuRef}>
                        <button onClick={toggleMenu} className={navbarStyles.userButton}>
                            <div className=" relative ">
                                <div className={navbarStyles.userAvatar}>
                                    {user?.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <div className={navbarStyles.statusIndicator}></div>
                            </div>
                            <div className={navbarStyles.userTextContainer}>
                                <p className={navbarStyles.userName}>{user?.name || "User"}</p>
                                <p className={navbarStyles.userEmail}>
                                    {user?.email || "user@expensetracker.com"}
                                </p>
                            </div>
                            <ChevronDown className={navbarStyles.chevronIcon + (menuOpen ? ' open' : '')} />
                        </button>
                        {/* dropped menu */}
                        {menuOpen && (
                            <div className={navbarStyles.dropdownMenu}>
                                <div className={navbarStyles.dropdownHeader} >
                                    <div className="flex items-center gap-2">
                                        <div className={navbarStyles.dropdownAvatar}>
                                            {user?.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <div className={navbarStyles.dropdownName}>
                                                {user?.name || "User"}
                                            </div>
                                            <div className={navbarStyles.dropdownEmail}>
                                                {user?.email || "user@expensetracker.com"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={navbarStyles.menuItemContainer}>
                                    <button onClick={() => {
                                        setMenuOpen(false);
                                        navigate("/profile");
                                    }} className={navbarStyles.menuItem}>
                                        <User className="w-4 h-4" />
                                        <span>My Profile</span>
                                    </button>

                                </div>
                                <div className={navbarStyles.menuItemBorder}>
                                    <button
                                        onClick={handleLogout}
                                        className={navbarStyles.logoutButton}
                                    >
                                        <LogOut className=" w-4 h-4" />
                                        <span>Log out</span>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;