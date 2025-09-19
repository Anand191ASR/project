import React, { createContext, useState, useEffect } from 'react';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item, qty = 1) => {
        setCart(prev => {
            const idx = prev.findIndex(p => p.menuItemId === item._id);
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx].quantity += qty;
                return copy;
            } else {
                return [...prev, { menuItemId: item._id, name: item.name, price: item.price, quantity: qty }];
            }
        });
    };

    const updateQty = (menuItemId, qty) => {
        setCart(prev => prev.map(p => p.menuItemId === menuItemId ? { ...p, quantity: qty } : p));
    };
    const removeFromCart = (menuItemId) => {
        setCart(prev => prev.filter(p => p.menuItemId !== menuItemId));
    };
    const clearCart = () => setCart([]);

    const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

    return <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart, total }}>{children}</CartContext.Provider>;
};
