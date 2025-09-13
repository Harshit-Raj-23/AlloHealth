import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { logout } from "../api/auth"; // ✅ use API layer
import { toast } from "react-toastify";

const Topbar = () => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } =
        useContext(AuthContext);

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ Handle Logout
    const handleLogout = async () => {
        try {
            const res = await logout();
            toast.success(res.data?.message || "Logged out successfully");

            setIsAuthenticated(false);
            setUser(null);

            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Redirect if unauthenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <header className="bg-white border-b flex items-center justify-between px-8 py-4 fixed w-full z-10">
            {/* Search bar */}
            <div className="flex-1 max-w-lg">
                <input
                    type="text"
                    placeholder="Search patients, doctors..."
                    className="w-full rounded-md border px-4 py-2 bg-gray-50 text-sm focus:outline-none focus:border-blue-400"
                />
            </div>

            <div className="flex items-center gap-8 ml-8">
                {/* Notification bell */}
                <div className="relative">
                    <svg
                        className="text-gray-500"
                        width="22"
                        height="22"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6.36-6c-.37-1.01-1.23-1.72-2.36-1.91V9a6 6 0 1 0-12 0v5.09c-1.13.19-1.99.9-2.36 1.91A1 1 0 0 0 4 18h16a1 1 0 0 0 .36-2z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                        3
                    </span>
                </div>

                {/* User profile + dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <div className="bg-blue-100 text-blue-700 rounded-full w-9 h-9 flex items-center justify-center font-bold">
                            {user?.name ? user.name[0].toUpperCase() : "U"}
                        </div>
                        <div className="text-left">
                            <div className="font-semibold text-sm text-gray-800">
                                {user?.name || "Unknown User"}
                            </div>
                            <div className="text-xs text-gray-500">
                                {user?.role || "Front Desk"}
                            </div>
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                            <div className="px-4 py-2 border-b font-semibold text-gray-700 text-sm">
                                My Account
                            </div>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5.121 17.804A9.969 9.969 0 0112 15c2.21 0 4.236.72 5.879 1.93M15 11a3 3 0 11-6 0 3 0 016 0z"
                                    />
                                </svg>
                                Profile
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                onClick={handleLogout}
                            >
                                <svg
                                    className="w-4 h-4 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7"
                                    />
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
