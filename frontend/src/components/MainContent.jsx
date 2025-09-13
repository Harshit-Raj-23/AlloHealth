import { Outlet } from "react-router-dom";

const MainContent = () => {
    return (
        <main className="flex-1 p-8 bg-gray-50 mt-16 overflow-y-auto">
            <Outlet />
        </main>
    );
};

export default MainContent;
