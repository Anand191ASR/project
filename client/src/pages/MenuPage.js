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
    }

    return (
        <div style={{ padding: 16 }}>
            <h2>Menu</h2>
            {items.map(it => <MenuItemCard key={it._id} item={it} onAdd={(item) => addToCart(item, 1)} />)}
        </div>
    );
}
