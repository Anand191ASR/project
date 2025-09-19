import React, { createContext, useState, useEffect } from 'react';
import { profile } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) return setUser(null);
        try {
            const res = await profile();
            setUser(res.data);
        } catch (err) {
            console.error(err);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem('token', token);
        setUser(userInfo);
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout, reload: loadProfile }}>{children}</AuthContext.Provider>;
};
