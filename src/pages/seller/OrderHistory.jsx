import { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { fetchOrders, getItemInfo, formatCurrency, formatDate } from '../../data/mockData';
import { useAuth } from '../../components/Layout';
import './Seller.css';

export default function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => { fetchOrders().then(setOrders); }, []);

    const columns = [
        { key: 'id', label: 'Order ID', render: (v) => String(v).slice(0, 8) },
        { key: 'buyerId', label: 'Buyer', render: (v, row) => row.buyerInfo?.name || '—' },
        { key: 'item', label: 'Item', render: (v, row) => row.itemInfo ? `${row.itemInfo.icon} ${row.itemInfo.name}` : v },
        { key: 'quantity', label: 'Qty', render: (v, row) => `${v} ${row.unit}` },
        { key: 'totalPrice', label: 'Total', render: (v) => formatCurrency(v) },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    ];

    return (
        <div className="page-seller">
            <div className="page-header">
                <h2>Order History 📦</h2>
                <p className="text-muted">Orders placed against your listings</p>
            </div>
            <DataTable columns={columns} data={orders} emptyMessage="No orders yet." />
        </div>
    );
}
