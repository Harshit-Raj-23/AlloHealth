import api from "../utils/api.js";

// Get queue list
export const fetchQueue = async () => {
    const res = await api.get("/queue");
    return res.data;
};

// Add to queue
export const addToQueue = async (queueData) => {
    const res = await api.post("/queue", queueData);
    return res.data;
};

// Update queue status
export const updateQueue = async (id, status) => {
    const res = await api.put(`/queue/${id}`, { status });
    return res.data;
};
