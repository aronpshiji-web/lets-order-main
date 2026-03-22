import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Layout';
import './Navbar.css';

const roles = [
    { id: 'seller', icon: '🏬', label: 'Seller' },
    { id: 'buyer', icon: '🏬', label: 'Buyer' },
    { id: 'consumer', icon: '🛒', label: 'Consumer' },
];

export default function Navbar({ user, onMenuToggle }) {
    const { logout, switchRole } = useAuth();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSwitch = (roleId) => {
        switchRole(roleId);
        setShowProfile(false);
        navigate(`/${roleId}`);
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="navbar-menu-btn" onClick={onMenuToggle} aria-label="Menu">
                    <span></span><span></span><span></span>
                </button>
                <div className="navbar-greeting">
                    <span className="greeting-text">Welcome back,</span>
                    <span className="greeting-name">{user.name.split(' ')[0]}</span>
                </div>
            </div>

            <div className="navbar-right">
                <button className="navbar-icon-btn" title="Notifications">
                    🔔
                    <span className="notification-dot"></span>
                </button>
                <button className="navbar-icon-btn" title="Language">
                    🌐
                </button>
                <div className="navbar-profile-wrap">
                    <button className="navbar-avatar" onClick={() => setShowProfile(!showProfile)}>
                        {user.avatar}
                    </button>
                    {showProfile && (
                        <div className="navbar-dropdown">
                            <div className="dropdown-header">
                                <span className="dropdown-avatar">{user.avatar}</span>
                                <div>
                                    <div className="dropdown-name">{user.name}</div>
                                    <div className="dropdown-role">{user.role}</div>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-section-label">Switch Profile</div>
                            <div className="dropdown-role-switcher">
                                {roles.map(r => (
                                    <button
                                        key={r.id}
                                        className={`dropdown-role-btn ${user.role === r.id ? 'active' : ''}`}
                                        onClick={() => handleSwitch(r.id)}
                                    >
                                        <span>{r.icon}</span>
                                        <span>{r.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={handleLogout}>
                                🚪 Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
