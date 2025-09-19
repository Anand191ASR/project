import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container my-5">
            <div className="p-5 text-center bg-light rounded-3 shadow-sm">
                <h1 className="display-4 fw-bold">🍴 Welcome to Foodie Restaurant</h1>
                <p className="fs-4 col-lg-8 mx-auto">
                    Discover a world of flavor with our expertly crafted dishes, made fresh just for you.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                    <Link to="/login" className="btn btn-primary btn-lg px-4 gap-3">Login</Link>
                    <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">Register</Link>
                </div>
                <div className="mt-4">
                    <p className="text-muted">You'll need to log in to view our menu and place an order.</p>
                </div>
                {/* <img src='bg.png' /> */}
                {/* <div class="container-fluid p-0">
                    <img src="bg.png" class="img-fluid w-100" alt="Restaurant Background" />
                </div> */}
            </div>
        </div>
    );
};

export default LandingPage;