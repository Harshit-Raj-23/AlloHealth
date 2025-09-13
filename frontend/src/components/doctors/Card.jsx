const Card = ({ doctor, onDelete }) => {
    const { name, specialization, location, availability, _id } = doctor;
    const isOnDuty = (availability?.length ?? 0) > 0;

    return (
        <li className="flex justify-between items-center rounded-lg border px-5 py-4 bg-gray-50">
            <div>
                <div className="text-lg font-semibold text-gray-900">
                    Dr. {name}
                </div>
                <div className="text-gray-600">{location || "—"}</div>
                <div className="text-sm text-blue-600">{specialization}</div>
            </div>

            <div className="flex items-center gap-3">
                <span
                    className={`inline-block px-3 py-1 text-xs rounded font-semibold ${
                        isOnDuty
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                    }`}
                >
                    {isOnDuty ? "On Duty" : "Off Duty"}
                </span>

                <button
                    onClick={() => onDelete && onDelete(_id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    title="Delete doctor"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Card;
