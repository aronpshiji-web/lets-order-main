import { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { fetchClusters, fetchItemTypes, getItemInfo, formatCurrency } from '../../data/mockData';
import './Buyer.css';

export default function BrowseSupply() {
    const [clusters, setClusters] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [itemFilter, setItemFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchClusters().then(setClusters);
        fetchItemTypes().then(setItemTypes);
    }, []);

    let filtered = clusters;
    if (itemFilter) filtered = filtered.filter(c => c.item === itemFilter);
    if (statusFilter) filtered = filtered.filter(c => c.status === statusFilter);

    const columns = [
        { key: 'item', label: 'Item', render: (v, row) => row.itemInfo ? `${row.itemInfo.icon} ${row.itemInfo.name}` : v },
        { key: 'totalQuantity', label: 'Available', render: (v, row) => `${v} ${row.unit}` },
        { key: 'avgPrice', label: 'Avg Price', render: (v) => formatCurrency(v) + '/unit' },
        { key: 'location', label: 'Location' },
        {
            key: 'fulfillment', label: 'Fulfillment', render: (v) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar" style={{ width: '60px' }}><div className="progress-fill" style={{ width: `${v}%` }}></div></div>
                    <span className="text-sm">{v}%</span>
                </div>
            )
        },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    ];

    return (
        <div className="page-buyer">
            <div className="page-header">
                <h2>Browse Supply 🔍</h2>
                <p className="text-muted">Aggregated supply from seller clusters</p>
            </div>
            <div className="filter-bar">
                <select value={itemFilter} onChange={e => setItemFilter(e.target.value)}>
                    <option value="">All Items</option>
                    {itemTypes.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="open">Open</option>
                    <option value="matched">Matched</option>
                    <option value="fulfilled">Fulfilled</option>
                </select>
            </div>
            <DataTable columns={columns} data={filtered} emptyMessage="No supply matching your filters." />
        </div>
    );
}
