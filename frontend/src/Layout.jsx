import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import MainContent from "./components/MainContent.jsx";

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <MainContent />
            </div>
        </div>
    );
};

export default Layout;
