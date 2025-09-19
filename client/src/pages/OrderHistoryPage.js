import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orders';
import { Link } from 'react-router-dom';

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await getMyOrders();
                setOrders(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">My Order History</h2>
            {orders.length === 0 ? (
                <div className="text-center">
                    <p className="fs-5">You haven't placed any orders yet.</p>
                    <Link to="/menu" className="btn btn-primary">Start Ordering</Link>
                </div>
            ) : (
                orders.map(o => (
                    <div key={o._id} className="card mb-3 shadow-sm">
                        <div className="card-header d-flex justify-content-between">
                            <span>Order ID: {o._id}</span>
                            <span className={`badge bg-${o.status === 'completed' ? 'success' : 'warning'}`}>{o.status}</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Total: ₹ {o.totalAmount.toFixed(2)}</h5>
                            <p className="card-text">Date: {new Date(o.createdAt).toLocaleDateString()}</p>
                            <h6>Items:</h6>
                            <ul className="list-group">
                                {o.items.map(it => (
                                    <li key={it.menuItemId._id} className="list-group-item">
                                        {it.menuItemId.name} x {it.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}