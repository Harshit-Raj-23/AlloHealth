const Card = ({ entry, onUpdateStatus }) => {
    // Determine which buttons to show based on current status
    const renderActions = () => {
        switch (entry.status) {
            case "waiting":
                return (
                    <>
                        <button
                            onClick={() =>
                                onUpdateStatus(entry._id, "with_doctor")
                            }
                            className="ml-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-4 py-1 transition"
                        >
                            Call
                        </button>
                        <button
                            onClick={() =>
                                onUpdateStatus(entry._id, "cancelled")
                            }
                            className="ml-1 text-xs bg-red-500 hover:bg-red-600 text-white font-semibold rounded px-3 py-1 transition"
                        >
                            Cancel
                        </button>
                    </>
                );
            case "with_doctor":
                return (
                    <button
                        onClick={() => onUpdateStatus(entry._id, "completed")}
                        className="ml-1 text-xs bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-3 py-1 transition"
                    >
                        Complete
                    </button>
                );
            default:
                return null; // completed or cancelled have no action buttons
        }
    };

    // Determine status badge
    const renderStatusBadge = () => {
        switch (entry.status) {
            case "waiting":
                return (
                    <span className="text-xs px-2 py-1 rounded font-semibold bg-yellow-100 text-yellow-700">
                        Waiting
                    </span>
                );
            case "with_doctor":
                return (
                    <span className="text-xs px-2 py-1 rounded font-semibold bg-blue-100 text-blue-700">
                        With Doctor
                    </span>
                );
            case "completed":
                return (
                    <span className="text-xs px-2 py-1 rounded font-semibold bg-green-100 text-green-700">
                        Completed
                    </span>
                );
            case "cancelled":
                return (
                    <span className="text-xs px-2 py-1 rounded font-semibold bg-red-100 text-red-700">
                        Cancelled
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <li className="flex items-center justify-between bg-blue-50 rounded-lg px-5 py-4">
            <div className="flex items-center gap-5">
                {/* Queue Number */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {entry.queueNumber || "-"}
                </div>

                {/* Patient + Doctor Info */}
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                            {entry.patient?.name || "Unknown"}
                        </span>
                        {entry.assignedDoctor?.name && (
                            <span className="text-sm text-gray-500">
                                ({entry.assignedDoctor.name})
                            </span>
                        )}
                    </div>
                    <div className="text-gray-500 text-sm">
                        {entry.patient?.phone || ""}
                    </div>
                </div>
            </div>

            {/* Status + Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
                {renderStatusBadge()}
                {renderActions()}
            </div>
        </li>
    );
};

export default Card;
