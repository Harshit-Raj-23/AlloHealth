import { useEffect, useState } from "react";
import { fetchDoctors, createDoctor, deleteDoctor } from "../api/doctors.js";
import Stats from "../components/doctors/Stats.jsx";
import List from "../components/doctors/List.jsx";
import AddModal from "../components/doctors/AddModal.jsx";
import { toast } from "react-toastify";

const Page = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadDoctors = async () => {
        setLoading(true);
        try {
            const apiResp = await fetchDoctors();
            setDoctors(apiResp.data || []);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to fetch doctors",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    const handleCreateDoctor = async (payload) => {
        try {
            await createDoctor(payload);
            await loadDoctors();
            setIsModalOpen(false);
            toast.success("Doctor created successfully");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to create doctor",
            );
            throw err; // forward in case modal wants to handle
        }
    };

    const handleDeleteDoctor = async (id) => {
        if (!confirm("Delete this doctor?")) return;
        try {
            await deleteDoctor(id);
            setDoctors((s) => s.filter((d) => d._id !== id));
            toast.success("Doctor deleted");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to delete doctor",
            );
        }
    };

    const totalDoctors = doctors.length;
    const onDutyCount = doctors.filter(
        (d) => d.availability?.length > 0,
    ).length;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="flex flex-wrap justify-between items-center mt-2 mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 text-base shadow-sm transition"
                    >
                        + Add Doctor
                    </button>
                </div>
            </div>

            {/* Stats */}
            <Stats total={totalDoctors} onDuty={onDutyCount} />

            {/* List */}
            <div className="mt-6">
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Doctors Directory
                    </h2>

                    {loading ? (
                        <div className="text-gray-600">Loading doctors...</div>
                    ) : doctors.length === 0 ? (
                        <div className="text-gray-500">No doctors found.</div>
                    ) : (
                        <List doctors={doctors} onDelete={handleDeleteDoctor} />
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <AddModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateDoctor}
                />
            )}
        </div>
    );
};

export default Page;
