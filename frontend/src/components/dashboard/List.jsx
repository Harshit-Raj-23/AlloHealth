import { toast } from "react-toastify";
import { updateQueue } from "../../api/queue.js";
import { updateAppointment } from "../../api/appointments.js";

const List = ({ items = [], type = "queue", onRefresh }) => {
    if (!items || !items.length)
        return <p className="text-gray-500 mt-4">No items</p>;

    // update queue or appointment status
    const changeStatus = async (id, status) => {
        try {
            if (type === "queue") {
                await updateQueue(id, status);
            } else {
                await updateAppointment(id, status);
            }
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
            case "booked":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <ul className="flex flex-col gap-3 mb-4">
            {items.map((item) => {
                const patientName =
                    item.patient?.name || item.patientName || "Unknown Patient";
                const phone = item.patient?.phone || "N/A";
                const doctorName =
                    item.assignedDoctor?.name ||
                    item.doctor?.name ||
                    item.doctorName ||
                    "Unknown Doctor";
                const specialization =
                    item.assignedDoctor?.specialization ||
                    item.doctor?.specialization ||
                    "";

                const slotText = item.slot
                    ? new Date(item.slot).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : type === "queue" && item.queueNumber
                      ? `#${item.queueNumber}`
                      : "--";

                return (
                    <li
                        key={item._id}
                        className="flex items-center justify-between bg-blue-50 rounded-lg px-5 py-4"
                    >
                        {/* Left side */}
                        <div className="flex items-center gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                                {type === "queue"
                                    ? item.queueNumber ||
                                      (item._id ? item._id.slice(-3) : "-")
                                    : patientName.charAt(0)}
                            </div>

                            <div>
                                <div className="text-lg font-semibold leading-tight text-gray-900">
                                    {patientName}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {phone}
                                </div>
                                <div className="mt-1 text-gray-800 text-sm">
                                    {doctorName}
                                </div>
                                <div className="text-xs text-blue-400">
                                    {specialization || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded ${statusBadge(item.status)}`}
                                >
                                    {item.status
                                        ? item.status.charAt(0).toUpperCase() +
                                          item.status.slice(1)
                                        : "Unknown"}
                                </span>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2">
                                {type === "queue" ? (
                                    <>
                                        {item.status === "waiting" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            item._id,
                                                            "with_doctor",
                                                        )
                                                    }
                                                    className="cursor-pointer text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-3 py-1 transition"
                                                >
                                                    Call
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            item._id,
                                                            "cancelled",
                                                        )
                                                    }
                                                    className="cursor-pointer text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-1 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        {item.status === "with_doctor" && (
                                            <button
                                                onClick={() =>
                                                    changeStatus(
                                                        item._id,
                                                        "completed",
                                                    )
                                                }
                                                className="cursor-pointer text-xs bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-3 py-1 transition"
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {item.status === "booked" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            item._id,
                                                            "completed",
                                                        )
                                                    }
                                                    className="cursor-pointer text-xs bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-3 py-1 transition"
                                                >
                                                    Complete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        changeStatus(
                                                            item._id,
                                                            "cancelled",
                                                        )
                                                    }
                                                    className="cursor-pointer text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-1 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default List;
