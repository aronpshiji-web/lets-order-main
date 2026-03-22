import { NavLink } from 'react-router-dom';
import { useAuth } from './Layout';
import './MobileNav.css';

const mobileItems = {
    seller: [
        { path: '/seller', icon: '📊', label: 'Home', end: true },
        { path: '/seller/add-product', icon: '🌱', label: 'Add' },
        { path: '/seller/listings', icon: '📋', label: 'Listings' },
        { path: '/seller/orders', icon: '📦', label: 'Orders' },
        { path: '/seller/payments', icon: '💰', label: 'Payments' },
    ],
    buyer: [
        { path: '/buyer', icon: '📊', label: 'Home', end: true },
        { path: '/buyer/browse', icon: '🔍', label: 'Browse' },
        { path: '/buyer/orders', icon: '📦', label: 'Orders' },
        { path: '/buyer/invoices', icon: '🧾', label: 'Invoices' },
    ],
    consumer: [
        { path: '/consumer', icon: '🏠', label: 'Shop', end: true },
        { path: '/consumer/cart', icon: '🧺', label: 'Cart' },
        { path: '/consumer/orders', icon: '📦', label: 'Orders' },
        { path: '/consumer/tracking', icon: '📍', label: 'Track' },
    ],
    admin: [
        { path: '/admin', icon: '📊', label: 'Home', end: true },
        { path: '/admin/users', icon: '👥', label: 'Users' },
        { path: '/admin/transactions', icon: '💳', label: 'Txns' },
        { path: '/admin/analytics', icon: '📈', label: 'Stats' },
    ],
};

export default function MobileNav({ role }) {
    const { cart } = useAuth();
    const items = mobileItems[role] || [];

    return (
        <nav className="mobile-nav">
            {items.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                    <span className="mobile-nav-icon">
                        {item.icon}
                        {item.label === 'Cart' && cart.length > 0 && (
                            <span className="cart-badge">{cart.length}</span>
                        )}
                    </span>
                    <span className="mobile-nav-label">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
