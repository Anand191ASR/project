import React, { useEffect, useState, useContext } from 'react';
import { getMenuItem } from '../api/menu';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        (async () => {
            try {
                const res = await getMenuItem(id);
                setItem(res.data);
            } catch (e) { console.error(e); }
        })();
    }, [id]);

    if (!item) {
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
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p className="card-text text-muted">{item.category}</p>
                            <p className="card-text fs-5">{item.description}</p>
                            <h3 className="card-text my-3">₹ {item.price.toFixed(2)}</h3>
                            <button onClick={() => addToCart(item, 1)} className="btn btn-primary btn-lg">Add to cart</button>
                            <Link to="/menu" className="btn btn-link mt-3 d-block">Back to Menu</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}