import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Our Restaurant</h1>
            <p style={styles.subtitle}>
                Discover a world of flavor with our expertly crafted dishes.
            </p>
            <div style={styles.buttonContainer}>
                <Link to="/menu" style={styles.button}>View Menu</Link>
                <Link to="/login" style={{ ...styles.button, ...styles.secondaryButton }}>Login</Link>
                <Link to="/register" style={{ ...styles.button, ...styles.secondaryButton }}>Register</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: '50px',
    },
    title: {
        fontSize: '48px',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '24px',
        marginBottom: '40px',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        display: 'inline-block',
        margin: '0 10px',
        padding: '15px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
    },
};

export default LandingPage;