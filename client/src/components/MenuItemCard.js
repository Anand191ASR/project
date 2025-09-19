import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuItemCard({ item, onAdd }) {
    return (
        <div className="card h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>₹ {item.price.toFixed(2)}</strong></p>
                <div className="mt-auto">
                    <button onClick={() => onAdd(item)} className="btn btn-primary">Add to cart</button>
                    <Link to={`/menu/${item._id}`} className="btn btn-secondary ms-2">View</Link>
                </div>
            </div>
        </div>
    );
}