import { useState, useEffect } from 'react';
import StatusBadge from '../../components/StatusBadge';
import { fetchConsumerOrders, formatDate, getItemInfo } from '../../data/mockData';
import { useAuth } from '../../components/Layout';
import './Consumer.css';

export default function ConsumerOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => { fetchConsumerOrders(user?.id).then(setOrders); }, [user?.id]);

    return (
        <div className="page-consumer">
            <div className="page-header">
                <h2>My Orders 📦</h2>
                <p className="text-muted">Track your produce orders</p>
            </div>
            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📭</div>
                    <h3>No orders yet</h3>
                    <p className="text-muted">Head to the shop to place your first order!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} className="stagger-children">
                    {orders.map(order => (
                        <div key={order.id} className="tracking-card">
                            <div className="tracking-header">
                                <div>
                                    <strong>#{String(order.id).slice(0, 8)}</strong>
                                    <div className="text-sm text-muted">{formatDate(order.orderDate)}</div>
                                </div>
                                <StatusBadge status={order.status} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                                {order.items.map((orderItem, idx) => {
                                    const itemInfo = getItemInfo(orderItem.item);
                                    return (
                                        <span key={idx} style={{ background: 'var(--color-bg)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)' }}>
                                            {itemInfo?.icon || '📦'} {itemInfo?.name || orderItem.item} × {orderItem.qty}
                                        </span>
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="text-sm text-muted">📍 {order.address || 'N/A'}</span>
                                <strong style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>₹{order.total}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
