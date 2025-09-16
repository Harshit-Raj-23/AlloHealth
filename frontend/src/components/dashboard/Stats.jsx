const Stats = ({ stats = {} }) => {
    const {
        queueCount = 0,
        appointmentsCount = 0,
        completedCount = 0,
        doctorsCount = 0,
    } = stats;

    const items = [
        {
            title: "Today's Queue",
            value: queueCount,
            color: "gray",
        },
        {
            title: "Appointments",
            value: appointmentsCount,
            color: "yellow",
        },
        {
            title: "Completed",
            value: completedCount,
            color: "green",
        },
        {
            title: "Available Doctors",
            value: doctorsCount,
            color: "blue",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            {items.map((it, idx) => (
                <div
                    key={idx}
                    className="bg-white border rounded-lg py-4 px-6 flex flex-col gap-2 justify-between"
                >
                    <div className="flex items-center mb-2 font-semibold text-gray-600">
                        {it.title}
                    </div>
                    <div className={`text-3xl font-bold text-${it.color}-500`}>
                        {it.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
