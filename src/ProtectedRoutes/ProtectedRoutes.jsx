import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
    // const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to="/adminLogin" />;
    }
    return children;
}

export default ProtectedRoutes
