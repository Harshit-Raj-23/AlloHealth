import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./Layout.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Layout />}></Route>
        </Routes>
    );
};

export default App;
