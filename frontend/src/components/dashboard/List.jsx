import QueueItem from "./QueueItem.jsx";
import AppointmentItem from "./AppointmentItem.jsx";

const List = ({ items = [], type = "queue", onRefresh, onUpdateStatus }) => {
    if (!items || !items.length)
        return <p className="text-gray-500 mt-4">No items</p>;

    return (
        <ul className="flex flex-col gap-3 mb-4">
            {items.map((item) =>
                type === "queue" ? (
                    <QueueItem
                        key={item._id}
                        item={item}
                        onRefresh={onRefresh}
                    />
                ) : (
                    <AppointmentItem
                        key={item._id}
                        item={item}
                        onUpdateStatus={onUpdateStatus}
                    />
                ),
            )}
        </ul>
    );
};

export default List;
