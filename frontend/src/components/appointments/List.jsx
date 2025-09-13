import { updateAppointment } from "../../api/appointments.js";
import { useState, useEffect } from "react";

const List = ({ appointments: initialAppointments, loading }) => {
    const [appointments, setAppointments] = useState(initialAppointments || []);

    useEffect(() => {
        setAppointments(initialAppointments || []);
    }, [initialAppointments]);

    if (loading) return <div>Loading...</div>;

    if (!appointments || appointments.length === 0) {
        return (
            <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
                <p className="text-lg font-medium">
                    No appointments booked yet
                </p>
                <p className="text-sm">
                    Click{" "}
                    <span className="font-semibold text-blue-600">
                        + Book Appointment
                    </span>{" "}
                    to create one.
                </p>
            </div>
        );
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await updateAppointment(id, { status: newStatus });

            if (res?.data) {
                // Update UI immediately
                setAppointments((prev) =>
                    prev.map((a) =>
                        a._id === id ? { ...a, status: newStatus } : a,
                    ),
                );
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    return (
        <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                Today's Appointments
            </h2>
            <ul className="flex flex-col gap-4 mt-4">
                {appointments.map((a) => (
                    <li
                        key={a._id}
                        className="flex items-center justify-between bg-blue-50 rounded-lg px-5 py-4"
                    >
                        {/* Patient Info */}
                        <div className="flex items-center gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                                {a.patient?.name?.charAt(0) || "?"}
                            </div>
                            <div>
                                <div className="text-lg font-semibold leading-tight text-gray-900">
                                    {a.patient?.name || "Unknown Patient"}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {a.patient?.phone || "N/A"}
                                </div>
                                <div className="mt-1 text-gray-800 text-sm">
                                    {a.doctor?.name || "Unknown Doctor"}
                                </div>
                                <div className="text-xs text-blue-400">
                                    {a.doctor?.specialization || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Appointment details */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-800 font-semibold text-base">
                                    {a.slot
                                        ? new Date(a.slot).toLocaleTimeString(
                                              [],
                                              {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              },
                                          )
                                        : "--:--"}
                                </span>
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded ${
                                        a.status === "booked"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : a.status === "cancelled"
                                              ? "bg-red-100 text-red-700"
                                              : a.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {a.status?.charAt(0).toUpperCase() +
                                        a.status?.slice(1)}
                                </span>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2">
                                {a.status === "booked" && (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleStatusChange(
                                                    a._id,
                                                    "completed",
                                                )
                                            }
                                            className="ml-1 text-xs bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-3 py-1 transition"
                                        >
                                            Complete
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStatusChange(
                                                    a._id,
                                                    "cancelled",
                                                )
                                            }
                                            className="ml-1 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-1 transition"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
