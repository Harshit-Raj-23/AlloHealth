const Card = ({ patient }) => {
    return (
        <li className="flex justify-between items-center rounded-lg border px-5 py-4 bg-gray-50">
            <div>
                <div className="text-lg font-semibold text-gray-900">
                    {patient.name}
                </div>
                <div className="text-gray-600">{patient.phone}</div>
                {patient.dob && (
                    <div className="text-xs text-gray-400">
                        DOB: {new Date(patient.dob).toLocaleDateString()}
                    </div>
                )}
            </div>
            <div>
                <span className="inline-block px-3 py-1 text-xs rounded font-semibold bg-yellow-100 text-yellow-700">
                    {patient.notes || "No notes"}
                </span>
            </div>
        </li>
    );
};

export default Card;
