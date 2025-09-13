import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../utils/constants.jsx";

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-white border-r p-6 flex flex-col fixed h-full">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-blue-600 rounded h-10 w-10 flex items-center justify-center">
                    {/* Logo Icon */}
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                        <path
                            d="M12 3V21M12 21C15.866 21 19 17.866 19 14C19 11.2386 16.3137 9 13 9C11.3431 9 10 10.3431 10 12C10 13.6569 11.3431 15 13 15C16.3137 15 19 12.7614 19 10M5 10C5 6.68629 8.13401 4 12 4C15.866 4 19 6.68629 19 10"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div>
                    <div className="font-bold text-lg text-gray-800 leading-tight">
                        Allo Health
                    </div>
                    <div className="text-xs text-gray-400">
                        Front Desk System
                    </div>
                </div>
            </div>

            <nav>
                <ul className="space-y-1">
                    {navLinks.map(({ to, label, icon }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`flex items-center px-4 py-2 rounded font-medium transition-all ${
                                    location.pathname === to
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:bg-blue-50"
                                }`}
                            >
                                {icon}
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
