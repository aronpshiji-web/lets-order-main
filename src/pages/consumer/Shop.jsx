import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Layout';
import { fetchProduceCatalog, formatCurrency } from '../../data/mockData';
import './Consumer.css';

export default function Shop() {
    const { addToCart, cart } = useContext(AuthContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [addedItems, setAddedItems] = useState({});
    const [produceCatalog, setProduceCatalog] = useState([]);

    useEffect(() => { fetchProduceCatalog().then(setProduceCatalog); }, []);

    const categories = [
        { name: 'All', icon: 'grid_view' },
        { name: 'Leafy Greens', icon: 'eco' },
        { name: 'Root Veg', icon: 'nutrition' },
        { name: 'Fruits', icon: 'local_florist' },
        { name: 'Grains', icon: 'egg' },
    ];

    const categoryColors = {
        'Leafy Greens': '#42d411',
        'Root Veg': '#F97316',
        'Fruits': '#EF4444',
        'Grains': '#EAB308',
    };

    const produceImages = {
        'Fresh Tomatoes': 'https://lh3.googleusercontent.com/aida-public/AB6AXuABmFpTGnvkfVB7r7zFzrPB1WmyMmPSCzObOtbDS5LTB0lknFMUF6FC-FWOG327oLd_CC4H28org6dyDfxDhNL3rXa2cHuN8n10XhG4pLemozCuboyLmukx5Vn3mq_i1jYZsDtStEpC9QQTrTfnZOhxkxgpFHpGZDSBv6zd7_CeUjyVJavwPU_s_RWgRWxpzTOgjLHp_Cv4Yj3Vdg54jNX9X_OYGDCnKHsHhvOjh2jS0fZF07CF9qDpAm9Ib2PHcn9yZDjJFGak46o',
        'Organic Spinach': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Qk9lwA5HdrzZ_OQBeJcmaOxUgN45CAAulkuDxZCXTAkwEHBnaRT28DQBSMjYojZX_mWnqebS7A-N_XAKkzfppZ4PjlyK7U7VuFTbO99GBQa3sZmLJYPCOsBX9NtI6hBmOszhsmWK5vZ3KiaqDhQtjfoptBM7EStmgbgCEVs4raa9ng-mF_Lhq6nBskxzuYF1Ruu3uUWAWhh01Q81Q3QFtzkEyJHm4RbUco2Fv-rlqwicoLFUX72s2go96o-cTRUH9KHOT9uYOzs',
        'Nendran Banana': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDl7eifuTZU86Xg1x-f-MxCd3sLD0xuEEuaJ35Gj3qEuHWXiGrlqaqNaZvtwGUWIICOXKJdOufEjD6rD_r_Y_iFM09FWxWpVrDTpXTXFxnUCWFbs82KpmnTJpPdh3BbUSY_Ru9PdLJSCSgXc_PyGsWAZeMnMzQJv1881NtK-CDBb0W_W80Rd9ierwbc2AzNNFE_wCYMCZow1UPW_Wn4DdKqWew3Myk0yY3Qrt4WFj71PG7hmNZUNd-I4NT98U7Ln7AGL_uUSA7eZg',
        'Alphonso Mango': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqPcJhVWGYA3g3d36zSdxy5lopkS_K0KrVCt0Ml_caC0uYpKxZN48vZBsGJo4wEhQZWns5kGCEVoU50TvZjsIXb6Jj8iUgwroZDHrz9DKWzAb8pacKxtAyYZEjfg8R3eYPZUXmR4yxsnjGNyDKMvVoOmBgrNo6tELVMeP5aBKDNHq-Tpef4Fw3-6USSuSEJeOiQnXcl-vWdJjBolK2hMIhkqObX4bSYz5a6nKLDTuWf_LQN8eLswibbRxdw8nuCoz04X-0qYWNRGk',
        'Fresh Coconut': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwoIcgr1RIvkOcppJaTCZS-o_RKNQPfrIs0se4NwEhykDDrj29z0PZeaI_2Gbg6kffvbZ328hBPEGW9WSG-9FMr2ou986JN1P2d_zqHVHrqHWLG2kCBjgEwynTPlRFysW1P7GnAa8qzSc_mRlCvCMkki8qsjdSvCbtxTePk9s3UX5giqiIx3PEJYoFkHO0QQsKLB5NvJLJ-R7MAS6qiKmQ0Rem_vlUo-oWSdgK5R0EptBkN97U2SMeNWR6ccjW8aJFQOJ_S2tfFZ0',
        'Matta Rice': 'https://lh3.googleusercontent.com/aida-public/AB6AXuALkL8fPc3HGohM165yrowYMiUHDyWRoUV3E7XJacnCZZrDyQb5yh-DlEbhsZkDLv56WTYkYbiNydnbph5q1fLGrxsYcWWoJv-JTAQvPYqVY5l45sdT3pC7F3ApBWSg8plCIMwnBsTltZcaPhqH2UEsEhmyNAYZiyFO2_V7ScEZ1L9qCJNdbXWn2rTIzDFPOmhqD7HDq2eRP6RnsNKc7bXuHuvy0kCV5QUpkHO7j3ZPe443kXQeXLpJbHnhT9Yz7xQPs5CSY7Wk2qA',
    };

    const badges = { 'Fresh Tomatoes': 'FRESH', 'Alphonso Mango': 'SALE' };
    const badgeColors = { 'FRESH': '#42d411', 'SALE': '#F97316' };

    const filtered = produceCatalog.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    const cartCount = cart.reduce((s, item) => s + item.qty, 0);
    const cartTotal = cart.reduce((s, item) => s + (item.price * item.qty), 0);

    const handleAdd = (product) => {
        addToCart(product);
        setAddedItems(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 1500);
    };

    return (
        <div className="stitch-consumer-shop">
            <div className="stitch-order-banner">
                <div className="stitch-order-banner-bg"></div>
                <div className="stitch-order-banner-content">
                    <div className="stitch-order-banner-info">
                        <div className="stitch-order-status"><span className="stitch-pulse-dot"></span><span>Out for Delivery</span></div>
                        <h3>Order #203</h3>
                        <p>Arriving in ~15 mins</p>
                    </div>
                    <button className="stitch-track-btn" onClick={() => navigate('/consumer/track')}>Track</button>
                </div>
            </div>
            <div className="stitch-consumer-search">
                <div className="stitch-consumer-search-inner">
                    <span className="material-symbols-outlined" style={{ color: '#9CA3AF' }}>search</span>
                    <input type="text" placeholder="Ask for tomatoes, spinach..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="stitch-consumer-mic"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>mic</span></button>
                </div>
            </div>
            <div className="stitch-categories no-scrollbar">
                {categories.map(cat => (
                    <button key={cat.name} className={`stitch-category-pill ${activeCategory === cat.name ? 'active' : ''}`} onClick={() => setActiveCategory(cat.name)}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: activeCategory === cat.name ? 'white' : (categoryColors[cat.name] || '#42d411') }}>{cat.icon}</span>
                        <span>{cat.name}</span>
                    </button>
                ))}
            </div>
            <div className="stitch-product-grid">
                {filtered.map(product => (
                    <div key={product.id} className="stitch-product-card">
                        <div className="stitch-product-img">
                            <img src={produceImages[product.name] || produceImages['Fresh Tomatoes']} alt={product.name} />
                            <button className={`stitch-add-btn ${addedItems[product.id] ? 'added' : ''}`} onClick={() => handleAdd(product)}>
                                <span className="material-symbols-outlined">{addedItems[product.id] ? 'check' : 'add'}</span>
                            </button>
                            {badges[product.name] && (
                                <div className="stitch-product-badge" style={{ background: badgeColors[badges[product.name]] || '#42d411' }}>{badges[product.name]}</div>
                            )}
                        </div>
                        <div className="stitch-product-info">
                            <h3>{product.name}</h3>
                            <p className="stitch-product-farm">{product.farmOrigin} • {product.unit}</p>
                            <div className="stitch-product-price">
                                <span className="stitch-price">{formatCurrency(product.price)}</span>
                                <span className="stitch-unit">/{product.unit}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {cartCount > 0 && (
                <div className="stitch-cart-bar-wrapper">
                    <button className="stitch-cart-bar" onClick={() => navigate('/consumer/cart')}>
                        <div className="stitch-cart-bar-left">
                            <div className="stitch-cart-count">{cartCount}</div>
                            <div className="stitch-cart-total-info">
                                <span className="stitch-cart-total-label">Total</span>
                                <span className="stitch-cart-total-value">{formatCurrency(cartTotal)}</span>
                            </div>
                        </div>
                        <div className="stitch-cart-bar-right">
                            <span>Checkout</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
