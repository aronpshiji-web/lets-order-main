import { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../components/Layout';
import { fetchListings, getItemInfo, formatCurrency, formatDate } from '../../data/mockData';
import './Seller.css';

export default function MyListings() {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);

    useEffect(() => { fetchListings(user?.id).then(setListings); }, [user?.id]);

    const columns = [
        { key: 'item', label: 'Item', render: (v, row) => row.itemInfo ? `${row.itemInfo.icon} ${row.itemInfo.name}` : v },
        { key: 'quantity', label: 'Quantity', render: (v, row) => `${v} ${row.unit}` },
        { key: 'productDate', label: 'Product Date', render: (v) => formatDate(v) },
        { key: 'expectedPrice', label: 'Price', render: (v) => v ? formatCurrency(v) + '/unit' : '—' },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    ];

    return (
        <div className="page-seller">
            <div className="page-header">
                <h2>My Listings 📋</h2>
                <p className="text-muted">All your product listings</p>
            </div>
            <DataTable columns={columns} data={listings} emptyMessage="No listings yet. Add your first product!" />
        </div>
    );
}
