import { Outlet } from "react-router-dom";

const MainContent = () => {
    return (
        <main className="flex-1 p-8 bg-gray-50">
            <Outlet />
        </main>
    );
};

export default MainContent;
