const Stats = ({ total = 0, onDuty = 0 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border rounded-lg px-6 py-5 flex flex-col gap-1">
                <div className="text-gray-600 font-semibold">Total Doctors</div>
                <div className="text-3xl font-bold text-gray-900">{total}</div>
            </div>

            <div className="bg-white border rounded-lg px-6 py-5 flex flex-col gap-1">
                <div className="text-gray-600 font-semibold">
                    Currently On Duty
                </div>
                <div className="text-3xl font-bold text-green-600">
                    {onDuty}
                </div>
            </div>
        </div>
    );
};

export default Stats;
