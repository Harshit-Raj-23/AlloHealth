import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Stats from "../components/dashboard/Stats.jsx";
import Card from "../components/dashboard/Card.jsx";
import List from "../components/dashboard/List.jsx";
import AddModal from "../components/dashboard/AddModal.jsx";
import AppointmentModal from "../components/dashboard/AppointmentModal.jsx";

import { fetchQueue, addToQueue, updateQueue } from "../api/queue.js";
import { fetchAppointments, createAppointment } from "../api/appointments.js";
import { fetchDoctors } from "../api/doctors.js";

const Dashboard = () => {
    const [queue, setQueue] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showApptModal, setShowApptModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();

    const unwrap = (resp) => (resp?.data !== undefined ? resp.data : resp);

    // today's string in IST (YYYY-MM-DD) for stable comparison
    const todayStr = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
    });

    const loadQueue = async () => {
        try {
            const res = await fetchQueue(); // returns ApiResponse
            const data = unwrap(res) || [];
            // only today's queue
            const todays = data.filter((q) => {
                if (!q?.createdAt) return false;
                const d = new Date(q.createdAt).toLocaleDateString("en-CA", {
                    timeZone: "Asia/Kolkata",
                });
                return d === todayStr;
            });
            // sort by queueNumber asc (null-safe)
            todays.sort((a, b) => (a.queueNumber ?? 0) - (b.queueNumber ?? 0));
            setQueue(todays);
        } catch (err) {
            console.error("Failed to load queue", err);
            toast.error("Failed to load queue");
        }
    };

    const loadAppointments = async () => {
        try {
            const res = await fetchAppointments();
            const data = unwrap(res) || [];
            // filter today's appointments by slot date (IST)
            const todays = data.filter((a) => {
                if (!a?.slot) return false;
                const d = new Date(a.slot).toLocaleDateString("en-CA", {
                    timeZone: "Asia/Kolkata",
                });
                return d === todayStr;
            });
            // sort earliest first
            todays.sort((a, b) => new Date(a.slot) - new Date(b.slot));
            setAppointments(todays);
        } catch (err) {
            console.error("Failed to load appointments", err);
            toast.error("Failed to load appointments");
        }
    };

    const loadDoctors = async () => {
        try {
            const res = await fetchDoctors();
            setDoctors(unwrap(res) || []);
        } catch (err) {
            console.error("Failed to load doctors", err);
        }
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await Promise.all([loadQueue(), loadAppointments(), loadDoctors()]);
            setLoading(false);
        };
        load();
    }, []);

    // status update wrapper (Call/Complete/Cancel) -> use backend updateQueue (PUT /queue/:id)
    const handleUpdateStatus = async (id, status) => {
        try {
            await updateQueue(id, { status }); // if your updateQueue helper expects (id, status) adjust accordingly
            await loadQueue(); // reload to keep order and latest populated data
            toast.success("Queue updated");
        } catch (err) {
            console.error("Failed to update queue status", err);
            toast.error("Failed to update queue");
        }
    };

    // On adding a new queue entry (walk-in)
    const handleAddQueue = async (entryOrTrigger) => {
        // the AddModal you have already uses addToQueue; we simply reload everything to get latest ordering/populated data
        await loadQueue();
        setShowAddModal(false);
    };

    // On creating appointment -> reload today's appointments (so no 'Unknown' patient/doctor)
    const handleAddAppointment = async () => {
        await loadAppointments();
        setShowApptModal(false);
    };

    const stats = {
        queueCount: queue.length,
        appointmentsCount: appointments.length,
        completedCount: queue.filter((q) => q.status === "completed").length,
        doctorsCount: doctors.length,
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>
                    <div className="text-gray-500 mt-1 text-base">
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            timeZone: "Asia/Kolkata",
                        })}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-5 py-2 text-sm transition flex items-center"
                    >
                        + Add Walk-in Patient
                    </button>

                    <button
                        onClick={() => setShowApptModal(true)}
                        className="bg-white border font-semibold text-blue-700 rounded-md px-5 py-2 text-sm transition hover:bg-blue-50"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

            <Stats stats={stats} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <Card
                    title="Current Queue"
                    subtitle="Today's patients in queue (sorted by queue number)"
                    icon={
                        <svg className="w-5 h-5" fill="none">
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />
                        </svg>
                    }
                    footerText="View All Queue"
                    onFooterClick={() => {
                        navigateTo("/queue");
                    }}
                >
                    <List items={queue} type="queue" onRefresh={loadQueue} />
                </Card>

                <Card
                    title="Upcoming Appointments"
                    subtitle="Today's scheduled appointments (earliest first)"
                    icon={
                        <svg className="w-5 h-5" fill="none">
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />
                        </svg>
                    }
                    footerText="View All Appointments"
                    onFooterClick={() => {
                        navigateTo("/appointments");
                    }}
                >
                    <List items={appointments} type="appointments" />
                </Card>
            </div>

            {/* Quick actions area (optional): reuse your old markup here */}

            {showAddModal && (
                <AddModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddQueue} // AddModal calls onAdd after success
                />
            )}

            {showApptModal && (
                <AppointmentModal
                    isOpen={showApptModal}
                    onClose={() => setShowApptModal(false)}
                    onAdded={handleAddAppointment}
                />
            )}
        </div>
    );
};

export default Dashboard;
