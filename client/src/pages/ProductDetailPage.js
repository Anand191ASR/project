import React, { useEffect, useState, useContext } from 'react';
import { getMenuItem } from '../api/menu';
import { useParams } from 'react-router-dom';
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

    if (!item) return <div>Loading...</div>;
    return (
        <div style={{ padding: 16 }}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>₹ {item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item, 1)}>Add to cart</button>
        </div>
    );
}
