import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Doctors from "./pages/Doctors.jsx";
import Patients from "./pages/Patients.jsx";
import Appointments from "./pages/Appointments.jsx";
import Queue from "./pages/QueueManagement.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />}></Route>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="queue" element={<Queue />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="doctors" element={<Doctors />} />
                    <Route path="patients" element={<Patients />} />
                </Route>
            </Routes>
            <ToastContainer position="bottom-right" />
        </>
    );
};

export default App;
