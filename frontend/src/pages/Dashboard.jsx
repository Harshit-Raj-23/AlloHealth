// Dummy Data
const queue = [
    {
        id: "001",
        name: "John Smith",
        time: "09:30 AM",
        urgency: "Normal",
        status: "Waiting",
    },
    {
        id: "002",
        name: "Sarah Johnson",
        time: "09:45 AM",
        urgency: "Urgent",
        status: "With Doctor",
    },
    {
        id: "003",
        name: "Mike Davis",
        time: "10:00 AM",
        urgency: "Normal",
        status: "Waiting",
    },
    {
        id: "004",
        name: "Emily Brown",
        time: "10:15 AM",
        urgency: "Normal",
        status: "Completed",
    },
];
const appointments = [
    {
        name: "Robert Wilson",
        doctor: "Dr. Smith",
        time: "11:00 AM",
        type: "Consultation",
    },
    {
        name: "Lisa Anderson",
        doctor: "Dr. Johnson",
        time: "11:30 AM",
        type: "Follow-up",
    },
    {
        name: "Tom Miller",
        doctor: "Dr. Brown",
        time: "12:00 PM",
        type: "Check-up",
    },
];

const Dashboard = () => {
    return (
        <div className="w-full">
            {/* Dashboard header */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>
                    <div className="text-gray-500 mt-1 text-base">
                        Thursday, September 11, 2025
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-5 py-2 text-sm transition flex items-center">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Add Walk-in Patient
                    </button>
                    <button className="bg-white border font-semibold text-blue-700 rounded-md px-5 py-2 text-sm transition hover:bg-blue-50">
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                <div className="bg-white border rounded-lg py-4 px-6 flex flex-col gap-2 justify-between">
                    <div className="flex items-center mb-2 font-semibold">
                        Today's Queue
                        <span className="ml-1 text-yellow-400">
                            <svg
                                width={18}
                                height={18}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="#FACC15"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M12 6v6l4 2"
                                    stroke="#FACC15"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">12</div>
                    <div className="text-sm text-gray-400">
                        Patients waiting
                    </div>
                </div>
                <div className="bg-white border rounded-lg py-4 px-6 flex flex-col gap-2 justify-between">
                    <div className="flex items-center mb-2 font-semibold">
                        Appointments
                        <span className="ml-1 text-blue-500">
                            <svg
                                width={18}
                                height={18}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    x="5"
                                    y="5"
                                    width="14"
                                    height="14"
                                    rx="2"
                                    stroke="#3B82F6"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M8 9h8M8 13h6"
                                    stroke="#3B82F6"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">28</div>
                    <div className="text-sm text-gray-400">Scheduled today</div>
                </div>
                <div className="bg-white border rounded-lg py-4 px-6 flex flex-col gap-2 justify-between">
                    <div className="flex items-center mb-2 font-semibold">
                        Completed
                        <span className="ml-1 text-green-500">
                            <svg
                                width={18}
                                height={18}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9 12l2 2l4-4"
                                    stroke="#22C55E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="#22C55E"
                                    strokeWidth="2"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">15</div>
                    <div className="text-sm text-gray-400">Patients served</div>
                </div>
                <div className="bg-white border rounded-lg py-4 px-6 flex flex-col gap-2 justify-between">
                    <div className="flex items-center mb-2 font-semibold">
                        Available Doctors
                        <span className="ml-1 text-gray-600">
                            <svg
                                width={18}
                                height={18}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M17 21v-2a4 4 0 0 0-8 0v2"
                                    stroke="#64748B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="12"
                                    cy="8"
                                    r="4"
                                    stroke="#64748B"
                                    strokeWidth="2"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800">8</div>
                    <div className="text-sm text-gray-400">
                        Currently on duty
                    </div>
                </div>
            </div>

            {/* Queue + Appointments */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                {/* Current Queue */}
                <div className="bg-white border rounded-lg p-6 flex flex-col">
                    <div className="text-xl font-semibold flex items-center mb-1">
                        <svg
                            className="w-5 h-5 mr-2 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />
                            <path
                                d="M12 8v4l3 2"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        Current Queue
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                        Patients currently in the queue
                    </div>
                    <ul className="flex flex-col gap-3 mb-4">
                        {queue.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center bg-white border rounded px-5 py-3"
                            >
                                <div>
                                    <div className="font-semibold text-gray-800 flex gap-3">
                                        <span className="text-xs text-gray-400 font-mono">
                                            Q{item.id}
                                        </span>
                                        {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {item.time}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span
                                        className={`text-xs px-2 py-1 rounded font-semibold ${
                                            item.urgency === "Urgent"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {item.urgency}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded font-semibold ${
                                            item.status === "Waiting"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : item.status === "With Doctor"
                                                  ? "bg-blue-100 text-blue-700"
                                                  : item.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : ""
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="block w-full border mt-2 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-50 transition text-center">
                        View All Queue
                    </button>
                </div>
                {/* Upcoming Appointments */}
                <div className="bg-white border rounded-lg p-6 flex flex-col">
                    <div className="text-xl font-semibold flex items-center mb-1">
                        <svg
                            className="w-5 h-5 mr-2 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />
                            <path
                                d="M8 3v4M16 3v4"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        Upcoming Appointments
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                        Next appointments scheduled
                    </div>
                    <ul className="flex flex-col gap-3 mb-4">
                        {appointments.map((item) => (
                            <li
                                key={item.name}
                                className="flex items-center bg-white border rounded justify-between px-5 py-3"
                            >
                                <div>
                                    <div className="font-semibold text-gray-800">
                                        {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {item.doctor}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-800 font-semibold text-base">
                                        {item.time}
                                    </span>
                                    <span className="text-xs rounded bg-gray-100 text-gray-600 px-2 py-0.5 mt-1">
                                        {item.type}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="block w-full border mt-2 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-50 transition text-center">
                        View All Appointments
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <svg
                        width="20"
                        height="20"
                        className="text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M4 17V13a4 4 0 0 1 4-4h8"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="9"
                            cy="9"
                            r="4"
                            stroke="#3B82F6"
                            strokeWidth="2"
                        />
                        <circle
                            cx="17"
                            cy="17"
                            r="2"
                            stroke="#3B82F6"
                            strokeWidth="2"
                        />
                    </svg>
                    <span className="text-lg font-semibold text-gray-800">
                        Quick Actions
                    </span>
                </div>
                <div className="text-sm text-gray-500 mb-6">
                    Common tasks for front desk staff
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded hover:bg-blue-50 border">
                        <svg
                            width="22"
                            height="22"
                            fill="none"
                            className="mb-2 text-blue-600"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 5v14M5 12h14"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="font-medium text-gray-800 text-sm">
                            Register Patient
                        </span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded hover:bg-blue-50 border">
                        <svg
                            width="22"
                            height="22"
                            fill="none"
                            className="mb-2 text-blue-600"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                x="5"
                                y="5"
                                width="14"
                                height="14"
                                rx="2"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />
                            <path
                                d="M8 9h8M8 13h6"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="font-medium text-gray-800 text-sm">
                            Schedule Appointment
                        </span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded hover:bg-blue-50 border">
                        <svg
                            width="22"
                            height="22"
                            fill="none"
                            className="mb-2 text-blue-600"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />
                            <path
                                d="M12 8v4l3 2"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="font-medium text-gray-800 text-sm">
                            Update Queue
                        </span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded hover:bg-blue-50 border">
                        <svg
                            width="22"
                            height="22"
                            fill="none"
                            className="mb-2 text-blue-600"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 8v4l3 2"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="font-medium text-gray-800 text-sm">
                            Emergency
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
