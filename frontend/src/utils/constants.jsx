export const navLinks = [
    {
        to: "/",
        label: "Dashboard",
        icon: (
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    d="M3 13h2v-2H3v2zm0 0h2v8h8v-2h-2v-2h2v-2H9V7h2V5H3v8z"
                    opacity="0"
                />
                <path d="M4 13V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6zm2-1h12" />
                <path d="M9 21V9h6v12" />
            </svg>
        ),
    },
    {
        to: "/queue",
        label: "Queue Management",
        icon: (
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        to: "/appointments",
        label: "Appointments",
        icon: (
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4" />
            </svg>
        ),
    },
    {
        to: "/doctors",
        label: "Doctors",
        icon: (
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M20 21v-2a4 4 0 0 0-8 0v2M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
        ),
    },
    {
        to: "/patients",
        label: "Patients",
        icon: (
            <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M17 21v-2a4 4 0 0 0-8 0v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];
