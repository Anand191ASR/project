// client/src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-container" style={styles.container}>
            <h1 style={styles.title}>🍴 Welcome to Foodie Restaurant</h1>
            <p style={styles.subtitle}>
                Delicious meals made fresh every day. Browse our menu and order now!
            </p>
            <Link to="/menu" style={styles.button}>
                View Menu
            </Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "80px",
    },
    title: {
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    subtitle: {
        fontSize: "18px",
        marginBottom: "30px",
    },
    button: {
        backgroundColor: "#ff6600",
        color: "#fff",
        padding: "10px 20px",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "18px",
    },
};

export default HomePage;
