import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RedirectIfAuth = ({ children }) => {
    const { user } = useContext(AuthContext);


    if (user) {
        return <Navigate to="/" replace />;
    }


    return children;
};

export default RedirectIfAuth;