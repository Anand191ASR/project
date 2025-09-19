import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../api/orders';
import { Link } from 'react-router-dom';

const AdminOrderManagementPage = () => {
    const [orders, setOrders] = useState([]);
    // 1. STATE: Keep track of the currently open accordion item's index.
    const [activeKey, setActiveKey] = useState(null);

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
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
            fetchOrders();
        } catch (err) {
            console.error("Failed to update order status:", err);
            alert("Error: Could not update status.");
        }
    };

    // 2. HANDLER: This function toggles the active accordion item.
    const handleAccordionToggle = (index) => {
        // If the clicked item is already open, close it. Otherwise, open the clicked item.
        setActiveKey(activeKey === index ? null : index);
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
                            {/* 3. DYNAMIC BUTTON: Removed data-bs-* attributes. Added onClick handler. */}
                            <button
                                className={`accordion-button ${activeKey !== index ? 'collapsed' : ''}`}
                                type="button"
                                onClick={() => handleAccordionToggle(index)}
                                aria-expanded={activeKey === index}
                            >
                                <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                                    <span>Order #{order._id.substring(0, 8)}... by {order.userId ? order.userId.name : '[Deleted User]'}</span>
                                    <h5>
                                        <span className={`badge bg-${getStatusVariant(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </h5>
                                </div>
                            </button>
                        </h2>
                        {/* 4. DYNAMIC CONTENT DIV: Class is now controlled by React state. */}
                        <div
                            id={`collapse-${index}`}
                            className={`accordion-collapse collapse ${activeKey === index ? 'show' : ''}`}
                        >
                            <div className="accordion-body">
                                <p><strong>User:</strong> {order.userId ? order.userId.email : '[Deleted User]'}</p>
                                <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                <h6>Items:</h6>
                                <ul>
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
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleStatusChange(order._id, e.target.value);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
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