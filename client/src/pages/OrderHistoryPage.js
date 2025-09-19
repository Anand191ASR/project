import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orders';

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await getMyOrders();
                setOrders(res.data);
            } catch (e) { console.error(e); }
        })();
    }, []);

    return (
        <div style={{ padding: 16 }}>
            <h2>My Orders</h2>
            {orders.map(o => (
                <div key={o._id} style={{ border: '1px solid #eee', marginBottom: 8, padding: 8 }}>
                    <div>Order: {o._id}</div>
                    <div>Status: {o.status}</div>
                    <div>Total: ₹ {o.totalAmount}</div>
                    <div>Items:
                        <ul>
                            {o.items.map(it => <li key={it.menuItemId._id}>{it.menuItemId.name} x {it.quantity}</li>)}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
