import React, { useState, useContext } from 'react';
import { login } from '../api/auth';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login: setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            setAuth(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div style={{ padding: 16 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                <div><input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
