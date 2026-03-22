import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../components/Layout';
import { fetchPayments, formatCurrency, formatDate } from '../../data/mockData';
import './Seller.css';

export default function Payments() {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);

    useEffect(() => { fetchPayments(user?.id).then(setPayments); }, [user?.id]);

    const completed = payments.filter(p => p.status === 'completed');
    const pending = payments.filter(p => p.status === 'pending');

    const columns = [
        { key: 'id', label: 'Payment ID', render: (v) => String(v).slice(0, 8) },
        { key: 'orderId', label: 'Order', render: (v) => v ? String(v).slice(0, 8) : '—' },
        { key: 'amount', label: 'Amount', render: (v) => formatCurrency(v) },
        { key: 'method', label: 'Method' },
        { key: 'date', label: 'Date', render: (v) => formatDate(v) },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    ];

    return (
        <div className="page-seller">
            <div className="page-header">
                <h2>Payments 💰</h2>
                <p className="text-muted">Track your payment history</p>
            </div>
            <div className="card-grid" style={{ marginBottom: 'var(--space-6)' }}>
                <Card icon="✅" title="Received" value={formatCurrency(completed.reduce((s, p) => s + p.amount, 0))} trend={`${completed.length} payments`} trendUp />
                <Card icon="⏳" title="Pending" value={formatCurrency(pending.reduce((s, p) => s + p.amount, 0))} subtitle={`${pending.length} pending`} />
            </div>
            <DataTable columns={columns} data={payments} emptyMessage="No payment records." />
        </div>
    );
}
