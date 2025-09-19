import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../api/orders';
import { Link } from 'react-router-dom';

const AdminOrderManagementPage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            // Sort orders so pending ones are at the top, then by date
            const sortedOrders = res.data.sort((a, b) => {
                if (a.status === 'pending' && b.status !== 'pending') return -1;
                if (a.status !== 'pending' && b.status === 'pending') return 1;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setOrders(sortedOrders);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders(); // Refresh the list to reflect the change
        } catch (err) {
            console.error("Failed to update order status:", err);
            alert("Error: Could not update status.");
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'in progress': return 'primary';
            case 'pending':
            default: return 'warning';
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Order Management</h1>
            <div className="accordion" id="ordersAccordion">
                {orders.map((order, index) => (
                    <div className="accordion-item" key={order._id}>
                        <h2 className="accordion-header" id={`heading-${index}`}>
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse-${index}`}
                            >
                                <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                                    {/* Add a check for userId before accessing its properties */}
                                    <span>Order #{order._id.substring(0, 8)}... by {order.userId ? order.userId.name : '[Deleted User]'}</span>
                                    <h5>
                                        <span className={`badge bg-${getStatusVariant(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </h5>
                                </div>
                            </button>
                        </h2>
                        <div
                            id={`collapse-${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading-${index}`}
                            data-bs-parent="#ordersAccordion"
                        >
                            <div className="accordion-body">
                                {/* Add a check for userId before accessing its properties */}
                                <p><strong>User:</strong> {order.userId ? order.userId.email : '[Deleted User]'}</p>
                                <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                <h6>Items:</h6>
                                <ul>
                                    {/* THE FIX IS HERE: Check if item.menuItemId exists before accessing .name */}
                                    {order.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.menuItemId ? item.menuItemId.name : '[Item no longer available]'} - Quantity: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3">
                                    <div className="d-flex align-items-center">
                                        <label htmlFor={`status-select-${order._id}`} className="form-label me-2">Update Status:</label>
                                        <select
                                            id={`status-select-${order._id}`}
                                            className="form-select"
                                            style={{ width: '200px' }}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Link to="/admin" className="btn btn-secondary">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default AdminOrderManagementPage;