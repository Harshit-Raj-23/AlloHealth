import { useState } from "react";

const AppointmentModal = ({ isOpen, onClose, onSave, doctors }) => {
    const [form, setForm] = useState({
        patientName: "",
        patientPhone: "",
        doctorId: "",
        date: "",
        time: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (
            !form.patientName ||
            !form.patientPhone ||
            !form.doctorId ||
            !form.date ||
            !form.time
        ) {
            alert("Please fill all fields!");
            return;
        }
        onSave(form);
        setForm({
            patientName: "",
            patientPhone: "",
            doctorId: "",
            date: "",
            time: "",
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Schedule Appointment</h2>

                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Patient Name
                    </label>
                    <input
                        type="text"
                        name="patientName"
                        value={form.patientName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                        placeholder="Enter patient name"
                    />
                </div>

                <div className="mb-3">
                    <label className="text-sm text-gray-600">Phone</label>
                    <input
                        type="text"
                        name="patientPhone"
                        value={form.patientPhone}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="mb-3">
                    <label className="text-sm text-gray-600">
                        Assign Doctor
                    </label>
                    <select
                        name="doctorId"
                        value={form.doctorId}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                                {doc.name} – {doc.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="text-sm text-gray-600">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                <div className="mb-3">
                    <label className="text-sm text-gray-600">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
