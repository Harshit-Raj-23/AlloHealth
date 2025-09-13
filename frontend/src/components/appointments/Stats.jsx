const Stats = ({ appointments }) => {
    const total = appointments?.length || 0;
    const booked = appointments.filter((a) => a.status === "booked").length;
    const cancelled = appointments.filter(
        (a) => a.status === "cancelled",
    ).length;
    const completed = appointments.filter(
        (a) => a.status === "completed",
    ).length;

    const stats = [
        {
            label: "Total Today",
            value: total,
            color: "gray",
        },
        {
            label: "Booked",
            value: booked,
            color: "yellow",
        },
        {
            label: "Completed",
            value: completed,
            color: "green",
        },
        {
            label: "Cancelled",
            value: cancelled,
            color: "red",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, idx) => (
                <div
                    key={idx}
                    className="bg-white border rounded-lg px-6 py-5 flex flex-col gap-1"
                >
                    <div className="flex items-center gap-2 text-gray-600 font-semibold">
                        {s.label}
                    </div>
                    <div className={`text-3xl font-bold text-${s.color}-500`}>
                        {s.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
