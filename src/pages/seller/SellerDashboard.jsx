import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Layout';
import { fetchListings, fetchClusters, fetchItemTypes, formatCurrency } from '../../data/mockData';
import './seller.css';

export default function SellerDashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [myListings, setMyListings] = useState([]);
    const [myClusters, setMyClusters] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);

    useEffect(() => {
        fetchListings(user?.id).then(setMyListings);
        fetchClusters().then(setMyClusters);
        fetchItemTypes().then(setItemTypes);
    }, [user?.id]);

    const totalEarnings = myListings.reduce((s, l) => s + ((l.expectedPrice || 0) * l.quantity), 0);
    const pendingOrders = myListings.filter(l => l.status === 'pending' || l.status === 'aggregated').length;

    const getItemName = (itemId) => {
        const ct = itemTypes.find(c => c.id === itemId);
        return ct ? ct.name : itemId;
    };

    const clusterImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcWg5R-rit7l8avJM0gl8Nut1GOYHrwfFQg8Gp4VjwpzfbI_lwZ9j7jApZtetiIxyz1-dO2jN1_fHeLjydNmghuNSVMb2MAvwOu4JmbSX1iFyv4WP7F46ZpPVKUM_LQDcwF1p9IvI0eDAwisqhws6bgNgs1w3oHt0x3JTCUSYeF_8YKf0ywHcpX39_DTP4nbSsTzLkUcRv3qnSo2NjzYbQBtF2-l3Yi-xATWPOjdL37ThAZFTLS5dwh2U1v-BZkxwBjpFP78Tvds',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAlTiuxED8N3VJO1azmp1rd8h51zlCK79GyVF-BCVgDQIheeT9cPC7Y67nZVmrFXXu1nhedzSHTJgqpFrBkyTErCwpnaPPWcWYDEoOCTkiC_gDxgYqIpcj_uWpXOdWh9bWDV0K7PPdW9n5Yxm97EXJ4ayviq6Qs8rGiPA5OMvNxPDok10BY80l0dUL-FxtJiQ6S8Wcnrg-wcA6LznWDYbuIlaZU-Rqg83cjC-HdRzzZ7JLBpzcz7fCy5ExpWQSXZMvbnRvy4r7oqjQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCNTURkpAxHo3LT19oNMSah0g47XCVjZSc7pA--ejcqvXOcnuObOqlDDPspI2XpYzRvPamFaNwsqS0r1DI_BUVGLAB7-dxOyd1FNBWeM9RD5yX-HNEHKk_9u7qEtN70fgnzWlBRfnY62G9XO8biTMico-n27lkau30wyvRKJZ8SFNXOv8d_yRBK-HIWOB0PAekma2S_Fz3JhyK52u37-BJR-HTv_Fp6fHG_POI0xoT2aXYn_oN7veBdJvRxNHHOiPgcXIMQ6tZdiHU',
    ];

    const statusColors = {
        'open': { bg: '#FEF9C3', text: '#A16207', dot: '#EAB308', label: 'Collecting' },
        'matched': { bg: '#DBEAFE', text: '#1D4ED8', dot: '#3B82F6', label: 'In Transit' },
        'fulfilled': { bg: '#DCFCE7', text: '#15803D', dot: '#22C55E', label: 'Completed' },
    };

    return (
        <div className="stitch-seller-dashboard">
            <section className="stitch-stats-scroll no-scrollbar">
                <div className="stitch-stat-card">
                    <div className="stitch-stat-decor"></div>
                    <div className="stitch-stat-header">
                        <div className="stitch-stat-icon" style={{ background: 'rgba(66,212,17,0.1)', color: '#42d411' }}>
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="stitch-stat-badge green">+12%</span>
                    </div>
                    <div className="stitch-stat-body">
                        <p className="stitch-stat-label">Total Earnings</p>
                        <h2 className="stitch-stat-value">{formatCurrency(totalEarnings)}</h2>
                    </div>
                </div>

                <div className="stitch-stat-card gradient">
                    <div className="stitch-stat-decor white"></div>
                    <div className="stitch-stat-header">
                        <div className="stitch-stat-icon glass">
                            <span className="material-symbols-outlined">compost</span>
                        </div>
                        <span className="stitch-stat-badge glass">Upcoming</span>
                    </div>
                    <div className="stitch-stat-body light">
                        <p className="stitch-stat-label">Next Product</p>
                        <h2 className="stitch-stat-value">{getItemName(myListings[0]?.item || 'tomato')}</h2>
                        <p className="stitch-stat-sublabel">Expected: {myListings[0]?.productDate || 'N/A'}</p>
                    </div>
                </div>

                <div className="stitch-stat-card">
                    <div className="stitch-stat-header">
                        <div className="stitch-stat-icon" style={{ background: '#FFF7ED', color: '#EA580C' }}>
                            <span className="material-symbols-outlined">pending_actions</span>
                        </div>
                    </div>
                    <div className="stitch-stat-body">
                        <p className="stitch-stat-label">Active Orders</p>
                        <h2 className="stitch-stat-value">{pendingOrders} Pending</h2>
                    </div>
                </div>
            </section>

            <div className="stitch-actions-row">
                <button className="stitch-action-btn primary" onClick={() => navigate('/seller/add-product')}>
                    <span className="material-symbols-outlined">add_circle</span>
                    New Listing
                </button>
                <button className="stitch-action-btn" onClick={() => navigate('/seller/orders')}>
                    <span className="material-symbols-outlined">history</span>
                    History
                </button>
            </div>

            <section className="stitch-clusters-section">
                <div className="stitch-section-header">
                    <h3>My Produce Clusters</h3>
                    <a onClick={() => navigate('/seller/clusters')}>View All</a>
                </div>
                <div className="stitch-cluster-list">
                    {myClusters.length > 0 ? myClusters.map((cluster, idx) => {
                        const sc = statusColors[cluster.status] || statusColors['open'];
                        return (
                            <div key={cluster.id} className="stitch-cluster-card" onClick={() => navigate('/seller/clusters')}>
                                <div className="stitch-cluster-img">
                                    <img src={clusterImages[idx % clusterImages.length]} alt={getItemName(cluster.item)} />
                                </div>
                                <div className="stitch-cluster-info">
                                    <div className="stitch-cluster-top">
                                        <span className="stitch-cluster-id">#{String(cluster.id).slice(0, 8)}</span>
                                        <span className="stitch-cluster-status" style={{ background: sc.bg, color: sc.text }}>
                                            <span className="stitch-dot" style={{ background: sc.dot }}></span>
                                            {sc.label}
                                        </span>
                                    </div>
                                    <h4>{getItemName(cluster.item)}</h4>
                                    <p className="stitch-cluster-qty">{cluster.totalQuantity}{cluster.unit} Contributed</p>
                                    <div className="stitch-cluster-bottom">
                                        <span>Est. Pay: Mar 2026</span>
                                        <span className="stitch-cluster-amount">{formatCurrency(cluster.totalQuantity * cluster.avgPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : myListings.slice(0, 2).map((listing, idx) => {
                        const sc = listing.status === 'sold' ? statusColors['fulfilled'] : statusColors['open'];
                        return (
                            <div key={listing.id} className="stitch-cluster-card">
                                <div className="stitch-cluster-img">
                                    <img src={clusterImages[idx % clusterImages.length]} alt={getItemName(listing.item)} />
                                </div>
                                <div className="stitch-cluster-info">
                                    <div className="stitch-cluster-top">
                                        <span className="stitch-cluster-id">#{String(listing.id).slice(0, 8)}</span>
                                        <span className="stitch-cluster-status" style={{ background: sc.bg, color: sc.text }}>
                                            <span className="stitch-dot" style={{ background: sc.dot }}></span>
                                            {sc.label}
                                        </span>
                                    </div>
                                    <h4>{listing.itemInfo?.name || getItemName(listing.item)}</h4>
                                    <p className="stitch-cluster-qty">{listing.quantity}{listing.unit} Listed</p>
                                    <div className="stitch-cluster-bottom">
                                        <span>Product: {listing.productDate}</span>
                                        <span className="stitch-cluster-amount">{formatCurrency((listing.expectedPrice || 0) * listing.quantity)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className="stitch-fab">
                <button className="stitch-fab-btn" onClick={() => navigate('/seller/add-product')}>
                    <span className="material-symbols-outlined" style={{ fontSize: 32 }}>mic</span>
                    <span className="stitch-fab-ping"></span>
                </button>
            </div>
        </div>
    );
}
