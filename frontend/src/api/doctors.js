import api from "../utils/api.js";

// Fetch all doctors (with optional filters)
export const fetchDoctors = async (filters = {}) => {
    const res = await api.get("/doctors", { params: filters });
    return res.data;
};

// Fetch single doctor
export const fetchDoctorById = async (id) => {
    const res = await api.get(`/doctors/${id}`);
    return res.data;
};

// Create doctor
export const createDoctor = async (doctorData) => {
    const res = await api.post("/doctors", doctorData);
    return res.data;
};

// Update doctor
export const updateDoctor = async (id, doctorData) => {
    const res = await api.put(`/doctors/${id}`, doctorData);
    return res.data;
};

// Delete doctor
export const deleteDoctor = async (id) => {
    const res = await api.delete(`/doctors/${id}`);
    return res.data;
};
