import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { fetchClusters, getItemInfo, formatCurrency } from '../../data/mockData';
import './Admin.css';

export default function ClusterMonitor() {
    const [clusters, setClusters] = useState([]);

    useEffect(() => { fetchClusters().then(setClusters); }, []);

    return (
        <div className="page-admin">
            <div className="page-header">
                <h2>Cluster Monitor 🔗</h2>
                <p className="text-muted">Monitor all aggregation clusters</p>
            </div>
            <div className="card-grid stagger-children">
                {clusters.map(cluster => {
                    const item = cluster.itemInfo || getItemInfo(cluster.item);
                    return (
                        <Card key={cluster.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                                <h4>{item?.icon || '🌿'} {item?.name || cluster.item}</h4>
                                <StatusBadge status={cluster.status} />
                            </div>
                            <div className="text-sm" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                                <span>ID: {String(cluster.id).slice(0, 8)}</span>
                                <span>{cluster.totalQuantity} {cluster.unit}</span>
                            </div>
                            <div className="text-sm text-muted" style={{ marginBottom: 'var(--space-2)' }}>
                                📍 {cluster.location || 'Kerala'}
                            </div>
                            <div className="text-sm" style={{ marginBottom: 'var(--space-2)' }}>
                                Avg Price: <strong>{formatCurrency(cluster.avgPrice)}</strong>/{cluster.unit}
                            </div>
                            <div style={{ marginBottom: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span className="text-sm">Fulfillment</span>
                                    <span className="text-sm font-semibold">{cluster.fulfillment}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${cluster.fulfillment}%` }}></div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
