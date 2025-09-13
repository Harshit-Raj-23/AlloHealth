import { createContext, useState } from "react";

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

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
