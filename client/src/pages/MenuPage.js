import React, { useEffect, useState, useContext } from 'react';
import { getMenuItems } from '../api/menu';
import MenuItemCard from '../components/MenuItemCard';
import { CartContext } from '../contexts/CartContext';

export default function MenuPage() {
    const [items, setItems] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await getMenuItems();
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Our Menu</h2>
            <div className="row">
                {items.map(it => (
                    <div className="col-md-6 col-lg-4 mb-4" key={it._id}>
                        <MenuItemCard item={it} onAdd={(item) => addToCart(item, 1)} />
                    </div>
                ))}
            </div>
        </div>
    );
}