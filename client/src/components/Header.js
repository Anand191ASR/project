import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

export default function Header() {
    // const { user, logout } = useContext(AuthContext);
    // const { cart } = useContext(CartContext);

    return (
        <header style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
            {/* <Link to="/"><strong>MyRestaurant</strong></Link> | <Link to="/menu">Menu</Link> | <Link to="/cart">Cart ({cart.length})</Link> */}
            {/* <span style={{ float: 'right' }}>
                {user ? (
                    <>
                        {user?.role === 'admin' && <Link to="/admin"> Admin</Link>}
                        <span style={{ marginLeft: 10 }}>{user.name}</span>
                        <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
                    </>
                )}
            </span> */}
        </header>
    );
}
