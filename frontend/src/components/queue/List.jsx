import Card from "./Card.jsx";

const List = ({ queue, loading, onUpdate }) => {
    if (loading) return <p className="text-gray-500 mt-4">Loading...</p>;
    if (!queue.length)
        return <p className="text-gray-500 mt-4">No patients in queue</p>;

    return (
        <ul className="flex flex-col gap-4 mt-4">
            {queue.map((entry) => (
                <Card key={entry._id} entry={entry} onUpdateStatus={onUpdate} />
            ))}
        </ul>
    );
};

export default List;
