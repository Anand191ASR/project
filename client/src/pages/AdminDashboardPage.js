import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../api/orders';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon }) => (
    <div className="col-md-6 col-lg-3 mb-4">
        <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
                <div className="fs-1 mb-2">{icon}</div>
                <h5 className="card-title">{title}</h5>
                <p className="card-text fs-3 fw-bold">{value}</p>
            </div>
        </div>
    </div>
);

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getAdminStats();
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Admin Dashboard</h1>

            {/* Stats Section */}
            <div className="row">
                <StatCard title="Total Revenue" value={`₹ ${stats?.totalRevenue.toFixed(2) || 0}`} icon="💰" />
                <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon="📋" />
                <StatCard title="Pending Orders" value={stats?.pendingOrders || 0} icon="⏳" />
                <StatCard title="Menu Items" value={stats?.totalMenuItems || 0} icon="🍔" />
            </div>

            {/* Navigation Section */}
            <div className="row mt-4 justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h4>Management Tools</h4>
                        </div>
                        <div className="list-group list-group-flush">
                            <Link to="/admin/menu" className="list-group-item list-group-item-action">
                                Manage Menu
                            </Link>
                            <Link to="/admin/orders" className="list-group-item list-group-item-action">
                                View All Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;