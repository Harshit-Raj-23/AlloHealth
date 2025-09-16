const Stats = ({ queue = [] }) => {
    const total = queue.length;
    const waiting = queue.filter((q) => q?.status === "waiting").length;
    const withDoctor = queue.filter((q) => q?.status === "with_doctor").length;
    const completed = queue.filter((q) => q?.status === "completed").length;
    const cancelled = queue.filter((q) => q?.status === "cancelled").length;

    const stats = [
        { label: "Total", value: total, color: "text-gray-500" },
        { label: "Waiting", value: waiting, color: "text-yellow-500" },
        { label: "With Doctor", value: withDoctor, color: "text-blue-500" },
        { label: "Completed", value: completed, color: "text-green-500" },
        { label: "Cancelled", value: cancelled, color: "text-red-500" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {stats.map((s, idx) => (
                <div
                    key={idx}
                    className="bg-white border rounded-lg px-6 py-5 flex flex-col gap-1"
                >
                    <div className="flex items-center gap-2 text-gray-600 font-semibold">
                        {s.label}
                    </div>
                    <div className={`text-3xl font-bold ${s.color}`}>
                        {s.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
