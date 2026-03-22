import { useState, useEffect } from 'react';
import StatusBadge from '../../components/StatusBadge';
import { fetchConsumerOrders } from '../../data/mockData';
import { useAuth } from '../../components/Layout';
import './Consumer.css';

export default function OrderTracking() {
    const { user } = useAuth();
    const [activeOrder, setActiveOrder] = useState(null);

    useEffect(() => {
        fetchConsumerOrders(user?.id).then(orders => {
            setActiveOrder(orders.find(o => o.status !== 'delivered') || null);
        });
    }, [user?.id]);

    const steps = [
        { label: 'Order Placed', time: '10:30 AM', done: true },
        { label: 'Processing', time: '11:00 AM', done: true },
        { label: 'Quality Check', time: '11:45 AM', done: activeOrder?.status === 'out_for_delivery' },
        { label: 'Out for Delivery', time: 'Est. 1:00 PM', done: false, current: activeOrder?.status === 'out_for_delivery' },
        { label: 'Delivered', time: '—', done: false },
    ];

    return (
        <div className="page-consumer">
            <div className="page-header">
                <h2>Track Order 📍</h2>
                <p className="text-muted">Real-time order tracking</p>
            </div>
            {!activeOrder ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>✅</div>
                    <h3>No active orders to track</h3>
                    <p className="text-muted">All your orders have been delivered!</p>
                </div>
            ) : (
                <div className="tracking-card animate-fade-in">
                    <div className="tracking-header">
                        <div>
                            <strong style={{ fontSize: 'var(--text-lg)' }}>#{String(activeOrder.id).slice(0, 8)}</strong>
                            <div className="text-sm text-muted">Delivery: {activeOrder.deliveryDate || 'TBD'}</div>
                        </div>
                        <StatusBadge status={activeOrder.status} size="md" />
                    </div>
                    <div className="tracking-timeline">
                        {steps.map((s, i) => (
                            <div key={i} className={`track-step ${s.done ? 'done' : ''} ${s.current ? 'current' : ''}`}>
                                <div className="track-dot"></div>
                                <div className="track-title">{s.label}</div>
                                <div className="track-time">{s.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
