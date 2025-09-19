import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { createOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";

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
            alert("⚠️ Order failed. Please log in first.");
            navigate("/login");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Your Cart 🛒</h2>

            {cart.length === 0 ? (
                <p style={styles.empty}>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.menuItemId} style={styles.cartItem}>
                            <div>
                                <strong>{item.name}</strong>
                                <p>₹ {item.price.toFixed(2)}</p>
                            </div>

                            <div style={styles.controls}>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQty(item.menuItemId, Number(e.target.value))
                                    }
                                    style={styles.input}
                                />
                                <button
                                    onClick={() => removeFromCart(item.menuItemId)}
                                    style={styles.removeBtn}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <h3 style={styles.total}>Total: ₹ {total.toFixed(2)}</h3>

                    <div style={styles.actions}>
                        <button onClick={clearCart} style={styles.clearBtn}>
                            Clear Cart
                        </button>
                        <button
                            onClick={handleCheckout}
                            disabled={!cart.length}
                            style={styles.checkoutBtn}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        background: "#fff",
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #eee",
    },
    controls: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    input: {
        width: "50px",
        padding: "5px",
        textAlign: "center",
    },
    removeBtn: {
        background: "#dc3545",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    total: {
        marginTop: "20px",
        fontSize: "20px",
        fontWeight: "bold",
    },
    actions: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
    },
    clearBtn: {
        background: "#6c757d",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    checkoutBtn: {
        background: "#28a745",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    empty: {
        textAlign: "center",
        color: "#666",
        fontSize: "18px",
        margin: "40px 0",
    },
};
