
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "10px",
        fontSize: "18px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "10px",
    },
};

export default RegisterPage;
