import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

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
                </Route>
            </Routes>
            <ToastContainer position="bottom-right" />
        </>
    );
};

export default App;
