import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // If not logged in => redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
