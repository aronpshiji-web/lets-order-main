import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Layout';
import { fetchClusters, fetchItemTypes, formatCurrency } from '../../data/mockData';
import './seller.css';

export default function ClusterStatus() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [clusters, setClusters] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);

    useEffect(() => {
        fetchClusters().then(setClusters);
        fetchItemTypes().then(setItemTypes);
    }, []);

    const cluster = clusters[0] || { item: 'rice', totalQuantity: 0, unit: 'kg', avgPrice: 0, fulfillment: 0, status: 'open' };

    const getItemName = (itemId) => {
        const ct = itemTypes.find(c => c.id === itemId);
        return ct ? ct.name : itemId;
    };

    const sellers = [
        { initials: 'RK', name: 'Ravi Kumar', time: '5 mins ago', kg: 50, bg: '#E3F2FD', color: '#1565C0', border: '#BBDEFB' },
        { initials: 'SM', name: 'Suresh M.', time: '2 hours ago', kg: 120, bg: '#F3E5F5', color: '#7B1FA2', border: '#E1BEE7' },
        { initials: 'AP', name: 'Anita P.', time: '1 day ago', kg: 80, bg: '#FFF3E0', color: '#E65100', border: '#FFE0B2' },
    ];

    const pct = cluster.fulfillment || 0;
    const targetQty = pct > 0 ? Math.round(cluster.totalQuantity / (pct / 100)) : cluster.totalQuantity;
    const remaining = targetQty - cluster.totalQuantity;

    return (
        <div className="stitch-cluster-details">
            <div className="stitch-cluster-hero">
                <div className="stitch-cluster-hero-icon">
                    <span className="material-symbols-outlined">spa</span>
                </div>
                <h2>{getItemName(cluster.item)}</h2>
                <p>March Product • Cluster #{String(cluster.id || '').slice(0, 8)}</p>
                <div className="stitch-price-badge">
                    <span className="material-symbols-outlined">lock</span>
                    Price Locked: {formatCurrency(cluster.avgPrice)}/{cluster.unit}
                </div>
            </div>
            <div className="stitch-cluster-content">
                <div className="stitch-progress-card">
                    <div className="stitch-progress-title">
                        <h3><span className="material-symbols-outlined">local_shipping</span> Bulk Order Status</h3>
                        <span className="stitch-active-tag">Active</span>
                    </div>
                    <p className="stitch-progress-desc">
                        We need <span>{remaining > 0 ? `${remaining}${cluster.unit} more` : 'no more'}</span> to fill the truck.
                    </p>
                    <div className="stitch-progress-bar">
                        <div className="stitch-progress-fill" style={{ width: `${pct}%` }}><span>{pct}%</span></div>
                        <div className="stitch-progress-stripe"></div>
                    </div>
                    <div className="stitch-progress-labels">
                        <span>Current: {cluster.totalQuantity}{cluster.unit}</span>
                        <span>Target: {targetQty}{cluster.unit}</span>
                    </div>
                    <div className="stitch-bonus-row">
                        <div className="stitch-bonus-icon"><span className="material-symbols-outlined">trending_up</span></div>
                        <div className="stitch-bonus-text"><p>Contribution Bonus</p><p>Add +50{cluster.unit} to reach Gold Tier</p></div>
                    </div>
                </div>
                <div className="stitch-contribution-card">
                    <div className="stitch-contribution-top">
                        <div><p className="stitch-contribution-label">Your Contribution</p><p className="stitch-contribution-value">200<span>{cluster.unit}</span></p></div>
                        <div style={{ textAlign: 'right' }}><p className="stitch-contribution-label">Estimated Value</p><p className="stitch-contribution-est">{formatCurrency(200 * cluster.avgPrice)}</p></div>
                    </div>
                    <button className="stitch-increase-btn" onClick={() => navigate('/seller/add-product')}>
                        <span className="material-symbols-outlined">add_circle</span> Increase My Share
                    </button>
                </div>
                <div className="stitch-sellers-section">
                    <div className="stitch-section-header" style={{ paddingLeft: 4 }}>
                        <h3>Nearby Sellers</h3>
                        <a>View All <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle' }}>chevron_right</span></a>
                    </div>
                    <div className="stitch-cluster-list">
                        {sellers.map((f, i) => (
                            <div key={i} className="stitch-seller-item">
                                <div className="stitch-seller-avatar" style={{ background: f.bg, color: f.color, border: `1px solid ${f.border}` }}>{f.initials}</div>
                                <div className="stitch-seller-meta"><p>{f.name}</p><p>Added {f.time}</p></div>
                                <div className="stitch-seller-kg"><span>+{f.kg}{cluster.unit}</span><div className="stitch-seller-verified"><span></span><span>Verified</span></div></div>
                            </div>
                        ))}
                        <div className="stitch-seller-teaser"><span className="material-symbols-outlined">groups</span> Sellers joined this cluster</div>
                    </div>
                </div>
                <button className="stitch-support-btn"><span className="material-symbols-outlined">support_agent</span> Call Field Officer</button>
            </div>
            <div className="stitch-fab">
                <button className="stitch-fab-btn" style={{ background: '#1a4d2e', boxShadow: '0 10px 25px rgba(26,77,46,0.3)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>mic</span>
                    <span className="stitch-fab-ping" style={{ background: '#42d411' }}></span>
                </button>
            </div>
        </div>
    );
}
