import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuItemCard({ item, onAdd }) {
    return (
        <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, marginBottom: 10 }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>₹ {item.price.toFixed(2)}</strong></p>
            <div>
                <button onClick={() => onAdd(item)}>Add to cart</button>
                <Link to={`/menu/${item._id}`} style={{ marginLeft: 10 }}>View</Link>
            </div>
        </div>
    );
}
