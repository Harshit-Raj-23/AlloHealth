import { useEffect, useState } from "react";
import { fetchQueue, updateQueue } from "../api/queue.js";
import Stats from "../components/queue/Stats.jsx";
import List from "../components/queue/List.jsx";
import AddModal from "../components/queue/AddModal.jsx";

const QueueManagement = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadQueue = async () => {
        setLoading(true);
        try {
            const res = await fetchQueue();
            setQueue(res.data || []);
        } catch (err) {
            console.error("Error loading queue:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadQueue();
    }, []);

    const handleAddQueue = async (newEntry) => {
        setQueue((prev) => [...prev, newEntry]);
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const res = await updateQueue(id, status);
            const updated = res.data;
            setQueue((prev) => prev.map((q) => (q._id === id ? updated : q)));
        } catch (err) {
            console.error("Error updating queue:", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center mt-2 mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Queue Management
                    </h1>
                    <p className="text-gray-500 text-base">
                        Manage walk-in patients and queue status
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 text-base flex items-center gap-2 shadow-sm transition"
                >
                    + Add Walk-in Patient
                </button>
            </div>

            <Stats queue={queue} />

            <div className="bg-white border rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Current Queue
                </h2>
                <List
                    queue={queue}
                    loading={loading}
                    onUpdate={handleUpdateStatus}
                />
            </div>

            <AddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddQueue}
            />
        </div>
    );
};

export default QueueManagement;
