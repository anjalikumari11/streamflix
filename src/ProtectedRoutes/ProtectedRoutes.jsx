import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
    // const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        console.log(user?.name);
        
        if (!user) {
            return <Navigate to="/adminLogin" />;
        }
    }, [])
    return children;
}

export default ProtectedRoutes
