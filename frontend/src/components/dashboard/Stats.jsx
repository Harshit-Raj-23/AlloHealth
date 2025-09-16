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
            subtitle: "Patients waiting",
        },
        {
            title: "Appointments",
            value: appointmentsCount,
            subtitle: "Scheduled today",
        },
        {
            title: "Completed",
            value: completedCount,
            subtitle: "Patients served",
        },
        {
            title: "Available Doctors",
            value: doctorsCount,
            subtitle: "Currently on duty",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            {items.map((it, idx) => (
                <div
                    key={idx}
                    className="bg-white border rounded-lg py-4 px-6 flex flex-col gap-2 justify-between"
                >
                    <div className="flex items-center mb-2 font-semibold">
                        {it.title}
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                        {it.value}
                    </div>
                    <div className="text-sm text-gray-400">{it.subtitle}</div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
