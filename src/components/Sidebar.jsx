import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './Layout';
import './Sidebar.css';

const navItems = {
    seller: [
        { path: '/seller', icon: '📊', label: 'Dashboard', end: true },
        { path: '/seller/add-product', icon: '🌱', label: 'Add Product' },
        { path: '/seller/listings', icon: '📋', label: 'My Listings' },
        { path: '/seller/clusters', icon: '🔗', label: 'Clusters' },
        { path: '/seller/orders', icon: '📦', label: 'Orders' },
        { path: '/seller/payments', icon: '💰', label: 'Payments' },
    ],
    buyer: [
        { path: '/buyer', icon: '📊', label: 'Dashboard', end: true },
        { path: '/buyer/browse', icon: '🔍', label: 'Browse Supply' },
        { path: '/buyer/forecasts', icon: '📈', label: 'Forecasts' },
        { path: '/buyer/orders', icon: '📦', label: 'Pre-Orders' },
        { path: '/buyer/invoices', icon: '🧾', label: 'Invoices' },
    ],
    consumer: [
        { path: '/consumer', icon: '🛒', label: 'Shop', end: true },
        { path: '/consumer/cart', icon: '🧺', label: 'Cart' },
        { path: '/consumer/orders', icon: '📦', label: 'My Orders' },
        { path: '/consumer/tracking', icon: '📍', label: 'Track Order' },
    ],
    admin: [
        { path: '/admin', icon: '📊', label: 'Dashboard', end: true },
        { path: '/admin/users', icon: '👥', label: 'Users' },
        { path: '/admin/clusters', icon: '🔗', label: 'Clusters' },
        { path: '/admin/transactions', icon: '💳', label: 'Transactions' },
        { path: '/admin/analytics', icon: '📈', label: 'Analytics' },
        { path: '/admin/disputes', icon: '⚠️', label: 'Disputes' },
    ],
};

const switchableRoles = [
    { id: 'seller', icon: '🏬', label: 'Seller' },
    { id: 'buyer', icon: '🏬', label: 'Buyer' },
    { id: 'consumer', icon: '🛒', label: 'Consumer' },
];

export default function Sidebar({ role, isOpen, onToggle }) {
    const items = navItems[role] || [];
    const { switchRole } = useAuth();
    const navigate = useNavigate();

    const handleSwitch = (newRole) => {
        switchRole(newRole);
        navigate(`/${newRole}`);
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <span className="logo-icon">🌿</span>
                    {isOpen && <span className="logo-text">Let's Order</span>}
                </div>
                <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
                    {isOpen ? '◀' : '▶'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {items.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        title={item.label}
                    >
                        <span className="sidebar-link-icon">{item.icon}</span>
                        {isOpen && <span className="sidebar-link-label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {isOpen && (
                <div className="sidebar-footer">
                    <div className="sidebar-switch-label">Switch Profile</div>
                    <div className="sidebar-role-switcher">
                        {switchableRoles.map(r => (
                            <button
                                key={r.id}
                                className={`sidebar-role-btn ${role === r.id ? 'active' : ''}`}
                                onClick={() => handleSwitch(r.id)}
                                title={r.label}
                            >
                                <span className="sidebar-role-icon">{r.icon}</span>
                                <span className="sidebar-role-label">{r.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}
