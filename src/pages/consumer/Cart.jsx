import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Layout';
import Button from '../../components/Button';
import './Consumer.css';

export default function Cart() {
    const { cart, updateCartQty, removeFromCart } = useAuth();
    const navigate = useNavigate();

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = cart.length > 0 ? 40 : 0;
    const total = subtotal + delivery;

    if (cart.length === 0) {
        return (
            <div className="page-consumer">
                <div className="page-header">
                    <h2>Your Cart 🧺</h2>
                </div>
                <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🛒</div>
                    <h3>Your cart is empty</h3>
                    <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>Browse our fresh produce and add items!</p>
                    <Button onClick={() => navigate('/consumer')}>Start Shopping</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-consumer">
            <div className="page-header">
                <h2>Your Cart 🧺</h2>
                <p className="text-muted">{cart.length} item{cart.length > 1 ? 's' : ''} in cart</p>
            </div>

            <div className="cart-layout">
                <div className="cart-list">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-icon">{item.icon}</div>
                            <div className="cart-item-info">
                                <h4>{item.name}</h4>
                                <small>₹{item.price}/{item.unit} · {item.farmOrigin}</small>
                            </div>
                            <div className="qty-controls">
                                <button className="qty-btn" onClick={() => updateCartQty(item.id, item.qty - 1)}>−</button>
                                <span className="qty-value">{item.qty}</span>
                                <button className="qty-btn" onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
                            </div>
                            <span className="cart-item-price">₹{item.price * item.qty}</span>
                            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="summary-row">
                        <span>Delivery</span>
                        <span>₹{delivery}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                    <Button fullWidth size="lg" style={{ marginTop: 'var(--space-4)' }} onClick={() => navigate('/consumer/checkout')}>
                        Checkout →
                    </Button>
                </div>
            </div>
        </div>
    );
}
