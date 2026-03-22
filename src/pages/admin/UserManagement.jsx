import { useState, useEffect } from 'react';
import StatusBadge from '../../components/StatusBadge';
import { fetchUsers, formatDate } from '../../data/mockData';
import './Admin.css';

export default function UserManagement() {
    const [roleFilter, setRoleFilter] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => { fetchUsers(roleFilter || undefined).then(setUsers); }, [roleFilter]);

    return (
        <div className="page-admin">
            <div className="page-header">
                <h2>User Management 👥</h2>
                <p className="text-muted">Manage platform users across all roles — includes Telegram-registered users</p>
            </div>
            <div className="filter-bar" style={{ marginBottom: 'var(--space-4)' }}>
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                    <option value="">All Roles</option>
                    <option value="seller">Sellers</option>
                    <option value="buyer">Buyers</option>
                    <option value="consumer">Consumers</option>
                    <option value="admin">Admins</option>
                </select>
                <span className="text-sm text-muted">{users.length} users found</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} className="stagger-children">
                {users.map(u => (
                    <div key={u.id} className="user-card">
                        <div className="user-avatar">{u.avatar}</div>
                        <div className="user-info">
                            <strong>{u.name}</strong>
                            <small>{u.phone} · {u.location || 'N/A'}</small>
                        </div>
                        <div className="user-meta">
                            <StatusBadge status={u.is_verified ? 'active' : 'pending'} />
                            <span className="text-sm text-muted" style={{ textTransform: 'capitalize' }}>{u.role}</span>
                            <span className="text-sm text-muted">Joined: {formatDate(u.joinDate)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
