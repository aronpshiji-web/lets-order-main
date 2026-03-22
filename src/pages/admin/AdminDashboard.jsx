import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { fetchPlatformStats, monthlyData, formatCurrency } from '../../data/mockData';
import './Admin.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalSellers: 0, totalBuyers: 0, totalConsumers: 0, totalTransactions: 0, activeClusters: 0, itemsSupported: 16, totalRevenue: 0, avgPriceIncrease: 23 });
    const maxTxn = Math.max(...monthlyData.map(d => d.transactions));

    useEffect(() => { fetchPlatformStats().then(setStats); }, []);

    return (
        <div className="page-admin">
            <div className="page-header">
                <h2>Admin Dashboard</h2>
                <p className="text-muted">Platform overview & management</p>
            </div>
            <div className="card-grid stagger-children">
                <Card icon="🏬" title="Total Sellers" value={stats.totalSellers.toLocaleString()} trend="+live" trendUp />
                <Card icon="🏬" title="Total Buyers" value={stats.totalBuyers} trend="+live" trendUp />
                <Card icon="🛒" title="Total Consumers" value={stats.totalConsumers.toLocaleString()} trend="+live" trendUp />
                <Card icon="💰" title="Total Revenue" value={formatCurrency(stats.totalRevenue)} trend="+18%" trendUp />
            </div>
            <div className="card-grid" style={{ marginTop: 'var(--space-4)' }}>
                <Card icon="🔗" title="Active Clusters" value={stats.activeClusters} />
                <Card icon="📊" title="Total Transactions" value={stats.totalTransactions.toLocaleString()} />
                <Card icon="🌾" title="Items Supported" value={stats.itemsSupported} />
                <Card icon="📈" title="Avg Price Increase" value={`${stats.avgPriceIncrease}%`} subtitle="For sellers" />
            </div>
            <div className="dashboard-grid" style={{ marginTop: 'var(--space-6)' }}>
                <Card title="Platform Activity" className="span-2">
                    <div className="chart-container">
                        <div className="bar-chart">
                            {monthlyData.map((d, i) => (
                                <div key={i} className="bar-group">
                                    <div className="bars">
                                        <div className="bar bar-supply" style={{ height: `${(d.transactions / maxTxn) * 100}%`, width: '28px' }}></div>
                                    </div>
                                    <span className="bar-label">{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
                <Card title="Recent Activity">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {[
                            { icon: '🏬', text: 'New user registered via Telegram', time: 'Live' },
                            { icon: '📦', text: 'New order from Telegram bot', time: 'Live' },
                            { icon: '💰', text: 'Payment processed', time: 'Live' },
                            { icon: '🔗', text: 'Cluster updated', time: 'Live' },
                        ].map((a, i) => (
                            <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-border-light)' }}>
                                <span style={{ fontSize: '1.2rem' }}>{a.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div className="text-sm">{a.text}</div>
                                    <div className="text-sm text-muted">{a.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
