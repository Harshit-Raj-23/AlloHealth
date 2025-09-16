const Stats = ({ total = 0, onDuty = 0 }) => {
    const stats = [
        {
            label: "Total Doctors",
            value: total,
            color: "gray",
        },
        {
            label: "Currently On Duty",
            value: onDuty,
            color: "green",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {stats.map((s, idx) => (
                <div
                    key={idx}
                    className="bg-white border rounded-lg px-6 py-5 flex flex-col gap-1"
                >
                    <div className="text-gray-600 font-semibold">{s.label}</div>
                    <div className={`text-3xl font-bold text-${s.color}-500`}>
                        {s.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
