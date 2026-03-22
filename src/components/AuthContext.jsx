import { useState, createContext, useContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
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
        <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, updateCartQty, clearCart }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
