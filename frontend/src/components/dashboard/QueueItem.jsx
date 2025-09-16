import { toast } from "react-toastify";
import { updateQueue } from "../../api/queue.js";

const QueueItem = ({ item, onRefresh }) => {
    const qnum = item.queueNumber ?? (item._id ? item._id.slice(-4) : "-");
    const patientName = item.patient?.name || "Unknown";
    const phone = item.patient?.phone || "";
    const doctorName = item.assignedDoctor?.name || "Unknown";
    const specialization = item.assignedDoctor?.specialization || "";

    const changeStatus = async (id, status) => {
        try {
            await updateQueue(id, status);
            toast.success(`Marked ${status}`);
            onRefresh && onRefresh();
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error("Failed to update status");
        }
    };

    const statusBadge = (status) => {
        switch (status) {
            case "waiting":
                return "bg-yellow-100 text-yellow-700";
            case "with_doctor":
                return "bg-blue-100 text-blue-700";
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
            {/* Left side - patient + doctor */}
            <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {qnum}
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-900">
                        {patientName}
                    </div>
                    <div className="text-gray-500 text-sm">{phone}</div>
                    <div className="mt-1 text-gray-800 text-sm">
                        {doctorName}
                    </div>
                    <div className="text-xs text-blue-400">
                        {specialization || "N/A"}
                    </div>
                </div>
            </div>

            {/* Right side - status + actions */}
            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
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
                    {item.status === "waiting" && (
                        <>
                            <button
                                onClick={() =>
                                    changeStatus(item._id, "with_doctor")
                                }
                                className="cursor-pointer text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-3 py-1 transition"
                            >
                                Call
                            </button>
                            <button
                                onClick={() =>
                                    changeStatus(item._id, "cancelled")
                                }
                                className="cursor-pointer text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-1 transition"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    {item.status === "with_doctor" && (
                        <button
                            onClick={() => changeStatus(item._id, "completed")}
                            className="cursor-pointer text-xs bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-3 py-1 transition"
                        >
                            Complete
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

export default QueueItem;
