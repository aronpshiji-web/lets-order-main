import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../components/Layout';
import { fetchInvoices, formatCurrency, formatDate } from '../../data/mockData';
import './Buyer.css';

export default function Invoices() {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => { fetchInvoices(user?.id).then(setInvoices); }, [user?.id]);

    return (
        <div className="page-buyer">
            <div className="page-header">
                <h2>Invoices 🧾</h2>
                <p className="text-muted">Manage your purchase invoices</p>
            </div>
            <div className="card-grid" style={{ marginBottom: 'var(--space-6)' }}>
                <Card icon="📃" title="Total Invoices" value={invoices.length} />
                <Card icon="✅" title="Paid" value={formatCurrency(invoices.filter(i => i.status === 'completed' || i.status === 'paid').reduce((s, i) => s + i.amount, 0))} />
                <Card icon="⏳" title="Outstanding" value={formatCurrency(invoices.filter(i => i.status !== 'completed' && i.status !== 'paid').reduce((s, i) => s + i.amount, 0))} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} className="stagger-children">
                {invoices.map(inv => (
                    <div key={inv.id} className="invoice-card">
                        <div className="invoice-left">
                            <div className="invoice-icon">🧾</div>
                            <div className="invoice-info">
                                <strong>Order #{String(inv.orderId).slice(0, 8)}</strong>
                                <small>Issued: {formatDate(inv.date)}</small>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                            <StatusBadge status={inv.status} />
                            <span className="invoice-amount">{formatCurrency(inv.amount)}</span>
                        </div>
                    </div>
                ))}
                {invoices.length === 0 && (
                    <Card>
                        <div className="success-message">
                            <div className="success-icon">📭</div>
                            <h3>No invoices</h3>
                            <p className="text-muted">Place an order to generate invoices.</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
