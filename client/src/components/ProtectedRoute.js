import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If user is not logged in, redirect them to the login page
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;