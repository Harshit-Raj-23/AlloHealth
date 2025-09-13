import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { login } from "../api/auth.js";
import { toast } from "react-toastify";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            toast.success(data.message);
            setIsAuthenticated(true);
            navigateTo("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [isAuthenticated, navigateTo]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <form
                className="bg-white rounded-xl shadow-md px-10 py-10 w-full max-w-sm flex flex-col items-center"
                onSubmit={handleSubmit}
            >
                {/* Logo */}
                <div className="mb-4 flex flex-col items-center">
                    <div
                        className="bg-blue-600 rounded-xl flex items-center justify-center mb-2"
                        style={{ width: 56, height: 56 }}
                    >
                        <svg
                            width="38"
                            height="38"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 3v18M20 14c0-3.314-2.686-6-6-6S8 10.686 8 14s2.686 6 6 6z"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Allo Health
                    </h1>
                    <div className="text-sm text-gray-500 mb-2 text-center">
                        Front Desk Management System
                    </div>
                </div>

                {/* Username field */}
                <div className="w-full mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Username
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                                <path d="M21 21v-2a4 4 0 00-3-3.87M3 21v-2a4 4 0 013-3.87" />
                            </svg>
                        </span>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            className="w-full border rounded px-9 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                </div>

                {/* Password field */}
                <div className="w-full mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <rect
                                    x="3"
                                    y="11"
                                    width="18"
                                    height="8"
                                    rx="2"
                                />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        </span>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            className="w-full border rounded px-9 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                {/* Sign In Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 text-base transition mb-5"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
