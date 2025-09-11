const Topbar = () => {
    return (
        <header className="bg-white border-b flex items-center justify-between px-8 py-4">
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
                {/* User profile */}
                <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-700 rounded-full w-9 h-9 flex items-center justify-center font-bold">
                        SJ
                    </div>
                    <div>
                        <div className="font-semibold text-sm text-gray-800">
                            Sarah Johnson
                        </div>
                        <div className="text-xs text-gray-500">Front Desk</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
