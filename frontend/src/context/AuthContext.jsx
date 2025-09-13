import { createContext, useState, useEffect } from "react";
import { loggedInUser } from "../api/auth.js";

// Create Context
const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: null,
    setUser: () => {},
});

// Provider Component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const apiResp = await loggedInUser();
                setUser(apiResp.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        fetchLoggedInUser();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
