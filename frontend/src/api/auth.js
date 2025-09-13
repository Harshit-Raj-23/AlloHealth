import api from "../utils/api";

/**
 * Login
 * Returns the API response body (ApiResponse object from backend).
 * Backend returns data under res.data.data (user, tokens, etc) and message under res.data.message
 */
export const login = async (username, password) => {
    const res = await api.post("/users/login", { username, password });
    return res.data; // { statusCode, data: { user, accessToken, refreshToken }, message, ... }
};

/**
 * Logout
 */
export const logout = async () => {
    const res = await api.post("/users/logout");
    return res.data;
};
