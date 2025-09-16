const AppointmentItem = ({ item, onUpdateStatus }) => {
    const patient = item.patient?.name || item.patientName || "Unknown Patient";
    const phone = item.patient?.phone || "";
    const doctor = item.doctor?.name || item.doctorName || "Unknown Doctor";
    const specialization = item.doctor?.specialization || "";
    const initials = patient?.charAt(0) || "?";

    const slotText = item.slot
        ? new Date(item.slot).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
          })
        : "--:--";

    const statusBadge = (status) => {
        switch (status) {
            case "booked":
                return "bg-yellow-100 text-yellow-700";
            case "completed":
                return "bg-green-100 text-green-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <li className="flex items-center justify-between bg-blue-50 rounded-lg px-5 py-4">
            {/* Left side - patient & doctor */}
            <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {initials}
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-900">
                        {patient}
                    </div>
                    <div className="text-gray-500 text-sm">{phone}</div>
                    <div className="mt-1 text-gray-800 text-sm">{doctor}</div>
                    <div className="text-xs text-blue-400">
                        {specialization || "N/A"}
                    </div>
                </div>
            </div>

            {/* Right side - slot time + status + actions */}
            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-semibold text-base">
                        {slotText}
                    </span>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${statusBadge(
                            item.status,
                        )}`}
                    >
                        {item.status?.charAt(0).toUpperCase() +
                            item.status?.slice(1)}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {item.status === "booked" && (
                        <>
                            <button
                                onClick={() =>
                                    onUpdateStatus(item._id, "completed")
                                }
                                className="cursor-pointer text-xs bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-3 py-1 transition"
                            >
                                Complete
                            </button>
                            <button
                                onClick={() =>
                                    onUpdateStatus(item._id, "cancelled")
                                }
                                className="cursor-pointer text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-1 transition"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

export default AppointmentItem;
