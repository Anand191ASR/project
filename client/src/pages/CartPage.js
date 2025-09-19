import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { createOrder } from "../api/orders";
import { useNavigate, Link } from "react-router-dom";

export default function CartPage() {
    const { cart, updateQty, removeFromCart, clearCart, total } =
        useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!cart.length) return;

        const items = cart.map((c) => ({
            menuItemId: c.menuItemId,
            quantity: c.quantity,
        }));

        try {
            await createOrder({ items });
            alert("✅ Order placed successfully!");
            clearCart();
            navigate("/orders");
        } catch (err) {
            console.error("Checkout error:", err);
            alert("⚠️ Order failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mb-4 text-center">Your Cart 🛒</h2>

                    {cart.length === 0 ? (
                        <div className="text-center">
                            <p className="fs-5">Your cart is empty.</p>
                            <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
                        </div>
                    ) : (
                        <>
                            <ul className="list-group mb-4">
                                {cart.map((item) => (
                                    <li key={item.menuItemId} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">{item.name}</h5>
                                            <p className="mb-1">₹ {item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQty(item.menuItemId, Number(e.target.value))
                                                }
                                                className="form-control"
                                                style={{ width: '60px' }}
                                            />
                                            <button
                                                onClick={() => removeFromCart(item.menuItemId)}
                                                className="btn btn-danger btn-sm ms-3"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-end mb-4">Total: ₹ {total.toFixed(2)}</h3>

                            <div className="d-flex justify-content-between">
                                <button onClick={clearCart} className="btn btn-secondary">
                                    Clear Cart
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    disabled={!cart.length}
                                    className="btn btn-success"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}