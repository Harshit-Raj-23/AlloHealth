import { useEffect, useState } from "react";
import { fetchPatients, createPatient } from "../../api/patients.js";
import { fetchDoctors } from "../../api/doctors.js";
import { addToQueue } from "../../api/queue.js";
import { toast } from "react-toastify";

const AddModal = ({ isOpen, onClose, onAdd }) => {
    const [form, setForm] = useState({
        patient: "",
        assignedDoctor: "",
    });
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showNewPatientForm, setShowNewPatientForm] = useState(false);
    const [newPatient, setNewPatient] = useState({ name: "", phone: "" });

    useEffect(() => {
        if (!isOpen) return;

        const loadData = async () => {
            try {
                const patientsRes = await fetchPatients();
                const doctorsRes = await fetchDoctors();
                setPatients(patientsRes.data || []);
                setDoctors(doctorsRes.data || []);
            } catch (err) {
                console.error("Error fetching patients/doctors", err);
                toast.error("Failed to load patients or doctors");
            }
        };

        loadData();
    }, [isOpen]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNewPatientChange = (e) => {
        setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
    };

    const handleAddNewPatient = async () => {
        try {
            const res = await createPatient(newPatient);
            const created = res.data.data;

            setPatients((prev) => [...prev, created]);
            setForm({ ...form, patient: created._id });
            setShowNewPatientForm(false);
            setNewPatient({ name: "", phone: "" });
            toast.success("Patient added successfully");
        } catch (err) {
            console.error("Error adding patient:", err);
            toast.error("Failed to add patient");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addToQueue(form);
            const newEntry = res.data;
            await onAdd(newEntry);
            setForm({ patient: "", assignedDoctor: "" });
            onClose();
            toast.success("Queue added successfully");
        } catch (err) {
            console.error("Error creating queue:", err);
            toast.error("Failed to add to queue");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">Add Walk-in Patient</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Patient Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Select Patient
                        </label>
                        <select
                            name="patient"
                            value={form.patient}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                            required
                        >
                            <option value="">-- Select Patient --</option>
                            {patients.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.name} ({p.phone})
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="mt-2 text-sm text-blue-600 hover:underline"
                            onClick={() =>
                                setShowNewPatientForm(!showNewPatientForm)
                            }
                        >
                            + Add New Patient
                        </button>
                    </div>

                    {/* Inline New Patient Form */}
                    {showNewPatientForm && (
                        <div className="border p-3 rounded bg-gray-50">
                            <input
                                type="text"
                                name="name"
                                placeholder="Patient Name"
                                value={newPatient.name}
                                onChange={handleNewPatientChange}
                                className="border rounded px-3 py-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={newPatient.phone}
                                onChange={handleNewPatientChange}
                                className="border rounded px-3 py-2 w-full mb-2"
                            />
                            <button
                                type="button"
                                onClick={handleAddNewPatient}
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                            >
                                Save Patient
                            </button>
                        </div>
                    )}

                    {/* Doctor Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Assign Doctor
                        </label>
                        <select
                            name="assignedDoctor"
                            value={form.assignedDoctor}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 w-full"
                            required
                        >
                            <option value="">-- Select Doctor --</option>
                            {doctors.map((d) => (
                                <option key={d._id} value={d._id}>
                                    {d.name} ({d.specialization})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
