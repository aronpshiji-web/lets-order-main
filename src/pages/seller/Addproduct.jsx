import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { fetchItemTypes, insertListing } from '../../data/mockData';
import './Seller.css';

export default function AddProduct() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [itemTypes, setItemTypes] = useState([]);
    const [form, setForm] = useState({
        item: '', quantity: '', productDate: '', location: user?.location || '', expectedPrice: ''
    });

    useEffect(() => { fetchItemTypes().then(setItemTypes); }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await insertListing({
                seller_id: user.id,
                item_id: form.item,
                quantity: Number(form.quantity),
                unit: itemTypes.find(c => c.id === form.item)?.unit || 'kg',
                product_date: form.productDate,
                location: form.location,
                expected_price: form.expectedPrice ? Number(form.expectedPrice) : null,
                status: 'pending',
            });
            setSubmitted(true);
            setTimeout(() => navigate('/seller/listings'), 2000);
        } catch (err) {
            console.error('Insert listing error:', err);
        }
    };

    if (submitted) {
        return (
            <div className="page-seller">
                <Card>
                    <div className="success-message animate-scale-in">
                        <div className="success-icon">✅</div>
                        <h3>Product Listed!</h3>
                        <p className="text-muted">Your {itemTypes.find(c => c.id === form.item)?.name || 'item'} listing has been created.</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="page-seller">
            <div className="page-header">
                <h2>Add Product 🌱</h2>
                <p className="text-muted">List your upcoming product for buyers</p>
            </div>
            <Card>
                <button className="voice-input-btn" type="button">
                    <span className="mic-icon">🎤</span>
                    Tap to add product via voice
                </button>
                <div style={{ textAlign: 'center', margin: 'var(--space-4) 0', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                    — or fill the form below —
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Item Type *</label>
                        <select name="item" className="form-select" value={form.item} onChange={handleChange} required>
                            <option value="">Select a item</option>
                            {itemTypes.map(c => (
                                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Quantity *</label>
                            <input type="number" name="quantity" className="form-input" placeholder="e.g. 500" value={form.quantity} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Unit</label>
                            <input type="text" className="form-input" value={form.item ? itemTypes.find(c => c.id === form.item)?.unit || 'kg' : 'kg'} readOnly />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Expected Product Date *</label>
                            <input type="date" name="productDate" className="form-input" value={form.productDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Expected Price (₹ per unit)</label>
                            <input type="number" name="expectedPrice" className="form-input" placeholder="Optional" value={form.expectedPrice} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location *</label>
                        <input type="text" name="location" className="form-input" placeholder="e.g. Kottayam, Kerala" value={form.location} onChange={handleChange} required />
                    </div>
                    <div className="form-actions">
                        <Button type="submit" size="lg">List Product</Button>
                        <Button variant="ghost" size="lg" onClick={() => navigate('/seller')}>Cancel</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
