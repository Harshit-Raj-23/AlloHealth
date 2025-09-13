// src/services/appointment.js
import api from "../utils/api.js";

// Get all appointments
export const fetchAppointments = async () => {
    const res = await api.get("/appointments");
    return res.data; // ApiResponse wrapper => { statusCode, data, message }
};

// Create (Book) appointment
export const createAppointment = async (appointmentData) => {
    const res = await api.post("/appointments", appointmentData);
    return res.data;
};

// Update appointment (reschedule / confirm / complete)
export const updateAppointment = async (id, updateData) => {
    const res = await api.put(`/appointments/${id}`, updateData);
    return res.data;
};

// Cancel appointment
export const deleteAppointment = async (id) => {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
};
