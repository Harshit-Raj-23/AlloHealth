import { useState, useEffect } from "react";
import { fetchDoctors } from "../../api/doctors.js";
import { fetchPatients } from "../../api/patients.js";

const AddModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        patient: "",
        doctor: "",
        slot: "",
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const p = await fetchPatients();
            const d = await fetchDoctors();
            setPatients(p.data);
            setDoctors(d.data);
        };
        fetchData();
    }, []);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            ></div>

            <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4 overflow-auto max-h-[90vh]">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Book Appointment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Patient
                        </label>
                        <select
                            name="patient"
                            value={formData.patient}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Select patient</option>
                            {patients.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Doctor
                        </label>
                        <select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Select doctor</option>
                            {doctors.map((d) => (
                                <option key={d._id} value={d._id}>
                                    {d.name} - {d.specialization}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Date & Time
                        </label>
                        <input
                            name="slot"
                            type="datetime-local"
                            value={formData.slot}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
