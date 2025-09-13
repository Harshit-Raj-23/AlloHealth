import Card from "./Card.jsx";

const List = ({ doctors = [], onDelete }) => {
    return (
        <ul className="flex flex-col gap-4">
            {doctors.map((doc) => (
                <Card key={doc._id} doctor={doc} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default List;
