import { useState, createContext, useContext } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import './Layout.css';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('loa_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('loa_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('loa_user', JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        setCart([]);
        localStorage.removeItem('loa_user');
        localStorage.removeItem('loa_cart');
    };

    const switchRole = (newRole) => {
        if (!user || user.role === newRole) return;
        const updated = { ...user, role: newRole };
        setUser(updated);
        setCart([]);
        localStorage.setItem('loa_user', JSON.stringify(updated));
        localStorage.removeItem('loa_cart');
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            let newCart;
            if (existing) {
                newCart = prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            } else {
                newCart = [...prev, { ...item, qty: 1 }];
            }
            localStorage.setItem('loa_cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => {
            const newCart = prev.filter(i => i.id !== itemId);
            localStorage.setItem('loa_cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const updateCartQty = (itemId, qty) => {
        if (qty <= 0) return removeFromCart(itemId);
        setCart(prev => {
            const newCart = prev.map(i => i.id === itemId ? { ...i, qty } : i);
            localStorage.setItem('loa_cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('loa_cart');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, switchRole, cart, addToCart, removeFromCart, updateCartQty, clearCart }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default function Layout() {
    const { user } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!user) return <Outlet />;

    const role = user.role;

    return (
        <div className={`layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
            <Sidebar role={role} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="layout-main">
                <Navbar user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
            <MobileNav role={role} />
        </div>
    );
}
