const Stats = ({ totalPatients }) => {
    return (
        <div className="bg-white border rounded-lg px-6 py-5 mb-8 flex flex-col gap-1 max-w-xs">
            <div className="text-gray-600 font-semibold">Total Patients</div>
            <div className="text-3xl font-bold text-gray-900">
                {totalPatients}
            </div>
        </div>
    );
};

export default Stats;
