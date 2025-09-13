import { useEffect, useState } from "react";
import Stats from "../components/patients/Stats.jsx";
import List from "../components/patients/List.jsx";
import AddModal from "../components/patients/AddModel.jsx";
import { fetchPatients, createPatient } from "../api/patients.js";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadPatients = async () => {
        try {
            const apiResp = await fetchPatients();
            setPatients(apiResp?.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    const handleAddPatient = async (patientData) => {
        try {
            await createPatient(patientData);
            await loadPatients();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error creating patient:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="flex flex-wrap justify-between items-center mt-2 mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 text-base shadow-sm transition"
                >
                    + Add Patient
                </button>
            </div>

            {/* Stats */}
            <Stats totalPatients={patients.length} />

            {/* Patient List */}
            <List patients={patients} />

            {/* Modal */}
            <AddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddPatient}
            />
        </div>
    );
};

export default Patients;
