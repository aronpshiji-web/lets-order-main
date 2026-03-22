import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Layout';
import Button from '../components/Button';
import { fetchUsers } from '../data/mockData';
import './Login.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState('phone'); // phone, otp, role
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phone.length >= 10) setStep('otp');
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length === 4) setStep('role');
    };

    const handleRoleSelect = async (role) => {
        setSelectedRole(role);
        setLoading(true);
        try {
            // Try to find an existing user with this role
            const users = await fetchUsers(role);
            let user = users[0]; // Pick first user of that role for demo

            // Admin fallback
            if (role === 'admin') {
                user = { id: 'admin', name: 'Admin', role: 'admin', phone: '+91 ' + phone, location: 'Kerala', avatar: '⚙️' };
            }

            if (user) {
                login(user);
                navigate(`/${role}`);
            } else {
                // No user found — create one implicitly or use a placeholder
                const placeholder = {
                    id: 'demo-' + role,
                    name: role === 'seller' ? 'Demo Seller' : role === 'buyer' ? 'Demo Buyer' : 'Demo Consumer',
                    role, phone: '+91 ' + phone, location: 'Kerala', avatar: role === 'seller' ? '🏬' : role === 'buyer' ? '🏬' : '🛒',
                };
                login(placeholder);
                navigate(`/${role}`);
            }
        } catch (err) {
            console.error('Login error:', err);
        }
        setLoading(false);
    };

    const roles = [
        { id: 'seller', icon: '🏬', title: 'Seller', desc: 'List & sell your product' },
        { id: 'buyer', icon: '🏬', title: 'Bulk Buyer', desc: 'Source produce at scale' },
        { id: 'consumer', icon: '🛒', title: 'Consumer', desc: 'Buy farm-fresh produce' },
        { id: 'admin', icon: '⚙️', title: 'Admin', desc: 'Manage the platform' },
    ];

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-brand" onClick={() => navigate('/')}>
                    <span>🌿</span>
                    <span>Let's Order Agri</span>
                </div>
                <div className="login-illustration">
                    <div className="login-float-card lfc-1">🌾 Fresh from Farm</div>
                    <div className="login-float-card lfc-2">📦 Direct Delivery</div>
                    <div className="login-float-card lfc-3">🤝 Fair Prices</div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    {step === 'phone' && (
                        <form onSubmit={handlePhoneSubmit} className="login-form animate-fade-in">
                            <h2>Welcome! 👋</h2>
                            <p className="login-subtitle">Enter your phone number to get started</p>
                            <div className="input-group">
                                <span className="input-prefix">+91</span>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className="login-input"
                                    autoFocus
                                />
                            </div>
                            <Button type="submit" fullWidth size="lg" disabled={phone.length < 10}>
                                Send OTP
                            </Button>
                            <p className="login-hint">Enter any 10-digit number</p>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleOtpSubmit} className="login-form animate-fade-in">
                            <h2>Verify OTP 🔐</h2>
                            <p className="login-subtitle">Enter the 4-digit code sent to +91 {phone}</p>
                            <div className="otp-inputs">
                                {[0, 1, 2, 3].map(i => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="otp-input"
                                        value={otp[i] || ''}
                                        autoFocus={i === 0}
                                        onChange={e => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            const newOtp = otp.split('');
                                            newOtp[i] = val;
                                            setOtp(newOtp.join(''));
                                            if (val && e.target.nextSibling) e.target.nextSibling.focus();
                                        }}
                                    />
                                ))}
                            </div>
                            <Button type="submit" fullWidth size="lg" disabled={otp.length < 4}>
                                Verify
                            </Button>
                            <p className="login-hint">Enter any 4 digits</p>
                            <button type="button" className="login-back" onClick={() => { setStep('phone'); setOtp(''); }}>
                                ← Change number
                            </button>
                        </form>
                    )}

                    {step === 'role' && (
                        <div className="login-form animate-fade-in">
                            <h2>I am a... 🎭</h2>
                            <p className="login-subtitle">Select your role to continue</p>
                            <div className="role-options">
                                {roles.map(r => (
                                    <button
                                        key={r.id}
                                        className={`role-option ${selectedRole === r.id ? 'selected' : ''}`}
                                        onClick={() => handleRoleSelect(r.id)}
                                        disabled={loading}
                                    >
                                        <span className="role-opt-icon">{r.icon}</span>
                                        <div>
                                            <strong>{r.title}</strong>
                                            <small>{r.desc}</small>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
