import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container text-center my-5">
            <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">🍴 Welcome back, {user?.name}!</h1>
                    <p className="col-md-8 fs-4 mx-auto">
                        Ready for another delicious meal? Browse our updated menu and discover your next favorite dish.
                    </p>
                    <Link to="/menu" className="btn btn-primary btn-lg mt-3">
                        View Menu
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;