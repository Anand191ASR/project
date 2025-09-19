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
                // Also sort user's orders by most recent
                const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const getStatusVariant = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'in progress': return 'primary';
            case 'pending':
            default: return 'warning';
        }
    };

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
                            <span>Order ID: {o._id.substring(0, 12)}...</span>
                            {/* Improved badge logic */}
                            <span className={`badge bg-${getStatusVariant(o.status)}`}>{o.status}</span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Total: ₹ {o.totalAmount.toFixed(2)}</h5>
                            <p className="card-text">Date: {new Date(o.createdAt).toLocaleString()}</p>
                            <h6>Items:</h6>
                            <ul className="list-group">
                                {/* THE FIX IS HERE: Check for 'it.menuItemId' and use a safe key */}
                                {o.items.map((it, itemIndex) => (
                                    <li key={itemIndex} className="list-group-item">
                                        {it.menuItemId ? `${it.menuItemId.name} x ${it.quantity}` : `[Item no longer available] x ${it.quantity}`}
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