import api from "../utils/api.js";

// Fetch all patients
export const fetchPatients = async () => {
    const res = await api.get("/patients");
    return res.data;
};

// Create a patient
export const createPatient = async (patientData) => {
    const res = await api.post("/patients", patientData);
    return res.data;
};
