import { useState } from "react";
import { toast } from "react-toastify";

/**
 * AddModal
 * Props:
 *  - onClose: () => void
 *  - onSubmit: async (payload) => {}  // should return created doctor (or throw)
 *
 * Form shape matches your doctor.model.js: name, specialization, gender, location, availability
 */

const WEEKDAYS = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
];

const emptySlot = () => ({ start: "", end: "" });
const emptyDayBlock = (day = 0) => ({ day, slots: [emptySlot()] });

const AddModal = ({ onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [gender, setGender] = useState("male");
    const [location, setLocation] = useState("");
    const [availability, setAvailability] = useState([emptyDayBlock(1)]);
    const [submitting, setSubmitting] = useState(false);

    const addDay = () => {
        setAvailability((s) => [...s, emptyDayBlock(0)]);
    };

    const removeDay = (index) => {
        setAvailability((s) => s.filter((_, i) => i !== index));
    };

    const updateDay = (index, dayValue) => {
        setAvailability((s) =>
            s.map((blk, i) =>
                i === index ? { ...blk, day: Number(dayValue) } : blk,
            ),
        );
    };

    const addSlot = (dayIndex) => {
        setAvailability((s) =>
            s.map((blk, i) =>
                i === dayIndex
                    ? { ...blk, slots: [...blk.slots, emptySlot()] }
                    : blk,
            ),
        );
    };

    const removeSlot = (dayIndex, slotIndex) => {
        setAvailability((s) =>
            s.map((blk, i) =>
                i === dayIndex
                    ? {
                          ...blk,
                          slots: blk.slots.filter((_, si) => si !== slotIndex),
                      }
                    : blk,
            ),
        );
    };

    const updateSlot = (dayIndex, slotIndex, field, value) => {
        setAvailability((s) =>
            s.map((blk, i) =>
                i === dayIndex
                    ? {
                          ...blk,
                          slots: blk.slots.map((sl, si) =>
                              si === slotIndex ? { ...sl, [field]: value } : sl,
                          ),
                      }
                    : blk,
            ),
        );
    };

    const validate = () => {
        if (!name.trim()) {
            toast.error("Name is required");
            return false;
        }
        if (!specialization.trim()) {
            toast.error("Specialization is required");
            return false;
        }
        // validate availability times if present
        for (const blk of availability) {
            for (const sl of blk.slots) {
                if (!sl.start || !sl.end) {
                    toast.error(
                        "All availability slots must have start & end times",
                    );
                    return false;
                }
                // optionally validate HH:mm format; minimal check:
                if (
                    !/^\d{2}:\d{2}$/.test(sl.start) ||
                    !/^\d{2}:\d{2}$/.test(sl.end)
                ) {
                    toast.error("Use HH:mm format for times");
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        if (!validate()) return;

        const payload = {
            name: name.trim(),
            specialization: specialization.trim(),
            gender,
            location: location.trim(),
            availability: availability.map((blk) => ({
                day: Number(blk.day),
                slots: blk.slots.map((sl) => ({
                    start: sl.start,
                    end: sl.end,
                })),
            })),
        };

        try {
            setSubmitting(true);
            await onSubmit(payload);
            // onSubmit closes modal by parent if success
        } catch (err) {
            // onSubmit should have shown a toast already; keep generic:
            toast.error("Failed to create doctor");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <div
                className="absolute inset-0 bg-black opacity-40"
                onClick={() => !submitting && onClose()}
            />
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl z-10 overflow-auto max-h-[80vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">Add Doctor</h3>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => !submitting && onClose()}
                    >
                        ✕
                    </button>
                </div>

                <form className="px-6 py-4 space-y-4" onSubmit={handleSubmit}>
                    {/* Basic info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name *
                            </label>
                            <input
                                className="mt-1 block w-full border rounded px-3 py-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Dr. John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Specialization *
                            </label>
                            <input
                                className="mt-1 block w-full border rounded px-3 py-2"
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                                placeholder="Cardiology"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <select
                                className="mt-1 block w-full border rounded px-3 py-2"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                className="mt-1 block w-full border rounded px-3 py-2"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Main Clinic"
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">
                                Availability
                            </h4>
                            <button
                                type="button"
                                onClick={addDay}
                                className="text-sm bg-blue-50 px-3 py-1 rounded text-blue-700"
                            >
                                + Add Day
                            </button>
                        </div>

                        <div className="space-y-3">
                            {availability.map((blk, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className="border rounded p-3 bg-white"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <label className="text-sm text-gray-700">
                                                Day
                                            </label>
                                            <select
                                                className="border rounded px-2 py-1"
                                                value={blk.day}
                                                onChange={(e) =>
                                                    updateDay(
                                                        dayIndex,
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                {WEEKDAYS.map((w) => (
                                                    <option
                                                        key={w.value}
                                                        value={w.value}
                                                    >
                                                        {w.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addSlot(dayIndex)
                                                }
                                                className="text-sm bg-green-50 px-3 py-1 rounded text-green-700"
                                            >
                                                + Slot
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeDay(dayIndex)
                                                }
                                                className="text-sm bg-red-50 px-3 py-1 rounded text-red-700"
                                            >
                                                Remove Day
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-2">
                                        {blk.slots.map((slot, slotIndex) => (
                                            <div
                                                key={slotIndex}
                                                className="flex gap-3 items-center"
                                            >
                                                <input
                                                    type="time"
                                                    value={slot.start}
                                                    onChange={(e) =>
                                                        updateSlot(
                                                            dayIndex,
                                                            slotIndex,
                                                            "start",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border rounded px-2 py-1"
                                                />
                                                <span className="text-sm text-gray-500">
                                                    to
                                                </span>
                                                <input
                                                    type="time"
                                                    value={slot.end}
                                                    onChange={(e) =>
                                                        updateSlot(
                                                            dayIndex,
                                                            slotIndex,
                                                            "end",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border rounded px-2 py-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSlot(
                                                            dayIndex,
                                                            slotIndex,
                                                        )
                                                    }
                                                    className="text-sm text-red-600"
                                                    title="Remove slot"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t">
                        <button
                            type="button"
                            onClick={() => !submitting && onClose()}
                            className="px-4 py-2 rounded border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 rounded bg-blue-600 text-white"
                        >
                            {submitting ? "Saving..." : "Save Doctor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
