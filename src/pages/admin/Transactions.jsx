import { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { fetchPayments, formatCurrency, formatDate } from '../../data/mockData';
import './Admin.css';

export default function Transactions() {
    const [payments, setPayments] = useState([]);

    useEffect(() => { fetchPayments().then(setPayments); }, []);

    const columns = [
        { key: 'id', label: 'Txn ID', render: (v) => String(v).slice(0, 8) },
        { key: 'orderId', label: 'Order', render: (v) => v ? String(v).slice(0, 8) : '—' },
        { key: 'amount', label: 'Amount', render: (v) => formatCurrency(v) },
        { key: 'method', label: 'Method' },
        { key: 'date', label: 'Date', render: (v) => formatDate(v) },
        { key: 'txnRef', label: 'Reference' },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    ];

    return (
        <div className="page-admin">
            <div className="page-header">
                <h2>Transactions 💳</h2>
                <p className="text-muted">All platform payment transactions</p>
            </div>
            <DataTable columns={columns} data={payments} emptyMessage="No transactions recorded." />
        </div>
    );
}
