import Card from "./Card.jsx";

const List = ({ patients }) => {
    return (
        <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Patient Records
            </h2>
            <ul className="flex flex-col gap-4">
                {patients.map((patient) => (
                    <Card key={patient._id} patient={patient} />
                ))}
            </ul>
        </div>
    );
};

export default List;
