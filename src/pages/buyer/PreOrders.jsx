import { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../components/Layout';
import { fetchOrders, getItemInfo, formatCurrency, formatDate } from '../../data/mockData';
import './Buyer.css';

export default function PreOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => { fetchOrders(user?.id).then(setOrders); }, [user?.id]);

    const columns = [
        { key: 'id', label: 'Order ID', render: (v) => String(v).slice(0, 8) },
        { key: 'item', label: 'Item', render: (v, row) => row.itemInfo ? `${row.itemInfo.icon} ${row.itemInfo.name}` : v },
        { key: 'quantity', label: 'Qty', render: (v, row) => `${v} ${row.unit}` },
        { key: 'pricePerUnit', label: 'Price/Unit', render: (v) => v ? formatCurrency(v) : '—' },
        { key: 'totalPrice', label: 'Total', render: (v) => formatCurrency(v) },
        { key: 'orderDate', label: 'Ordered', render: (v) => formatDate(v) },
        { key: 'deliveryDate', label: 'Delivery', render: (v) => v ? formatDate(v) : '—' },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    ];

    return (
        <div className="page-buyer">
            <div className="page-header">
                <h2>Pre-Orders 📦</h2>
                <p className="text-muted">Your active and past pre-orders</p>
            </div>
            <DataTable columns={columns} data={orders} emptyMessage="No pre-orders yet." />
        </div>
    );
}
