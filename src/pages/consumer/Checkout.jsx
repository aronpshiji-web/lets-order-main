import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import './Consumer.css';

export default function Checkout() {
    const { cart, clearCart } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('upi');

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = 40;
    const total = subtotal + delivery;

    if (cart.length === 0 && step !== 3) {
        navigate('/consumer/cart');
        return null;
    }

    const handlePlaceOrder = () => {
        setStep(3);
        clearCart();
    };

    return (
        <div className="page-consumer">
            <div className="page-header">
                <h2>Checkout</h2>
            </div>

            <div className="checkout-steps">
                <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                    <span className="checkout-step-num">{step > 1 ? '✓' : '1'}</span> Address
                </div>
                <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
                    <span className="checkout-step-num">{step > 2 ? '✓' : '2'}</span> Payment
                </div>
                <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}>
                    <span className="checkout-step-num">3</span> Confirm
                </div>
            </div>

            {step === 1 && (
                <Card className="animate-fade-in">
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Delivery Address</h3>
                    <div className="form-group">
                        <label className="form-label">Full Address *</label>
                        <textarea
                            className="form-input"
                            rows={3}
                            placeholder="Enter your complete delivery address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                    <div className="form-actions">
                        <Button size="lg" onClick={() => setStep(2)} disabled={!address.trim()}>
                            Continue →
                        </Button>
                    </div>
                </Card>
            )}

            {step === 2 && (
                <Card className="animate-fade-in">
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Payment Method</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {[
                            { id: 'upi', icon: '📱', label: 'UPI (Google Pay / PhonePe)' },
                            { id: 'cod', icon: '💵', label: 'Cash on Delivery' },
                            { id: 'card', icon: '💳', label: 'Credit / Debit Card' },
                        ].map(m => (
                            <label key={m.id} className={`role-option ${payment === m.id ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
                                <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <strong>{m.label}</strong>
                                </div>
                                <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} style={{ accentColor: 'var(--color-primary)' }} />
                            </label>
                        ))}
                    </div>
                    <div className="order-summary" style={{ marginTop: 'var(--space-4)' }}>
                        <div className="order-summary-row"><span>Items ({cart.length})</span><span>₹{subtotal}</span></div>
                        <div className="order-summary-row"><span>Delivery</span><span>₹{delivery}</span></div>
                        <div className="order-summary-row total"><span>Total</span><span>₹{total}</span></div>
                    </div>
                    <div className="form-actions">
                        <Button variant="ghost" size="lg" onClick={() => setStep(1)}>← Back</Button>
                        <Button size="lg" onClick={handlePlaceOrder}>Place Order · ₹{total}</Button>
                    </div>
                </Card>
            )}

            {step === 3 && (
                <Card className="animate-scale-in">
                    <div className="success-message">
                        <div className="success-icon">🎉</div>
                        <h3>Order Placed Successfully!</h3>
                        <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                            Your fresh produce will be delivered to you soon. Thank you for supporting local sellers!
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                            <Button onClick={() => navigate('/consumer/orders')}>View Orders</Button>
                            <Button variant="outline" onClick={() => navigate('/consumer')}>Continue Shopping</Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
