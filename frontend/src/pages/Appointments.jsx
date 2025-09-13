import { useState, useEffect } from "react";
import Stats from "../components/appointments/Stats.jsx";
import List from "../components/appointments/List.jsx";
import AddModal from "../components/appointments/AddModal.jsx";
import { fetchAppointments, createAppointment } from "../api/appointments";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const res = await fetchAppointments();
            setAppointments(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const handleSaveAppointment = async (data) => {
        try {
            await createAppointment(data);
            await loadAppointments(); // refresh immediately
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex flex-wrap justify-between items-center mt-2 mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Appointments
                    </h1>
                    <p className="text-gray-500 text-base">
                        Manage patient appointments and doctor schedules
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 text-base flex items-center gap-2 transition shadow-sm"
                >
                    + Book Appointment
                </button>
            </div>

            {/* Stats */}
            <Stats appointments={appointments} />

            {/* Appointments List */}
            <List appointments={appointments} loading={loading} />

            {/* Modal */}
            <AddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAppointment}
            />
        </div>
    );
};

export default Appointments;
