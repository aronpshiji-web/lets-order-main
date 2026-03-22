import { useContext, useState } from 'react';
import { AuthContext } from '../../components/Layout';
import { formatCurrency } from '../../data/mockData';
import './Buyer.css';

export default function BuyerDashboard() {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Vegetables', 'Fruits', 'Near Me', 'Ready to Ship'];

    const supplyCards = [
        {
            id: 1, item: 'Russet Potatoes', grade: 'Grade A • Organic', location: 'Aggregated from 4 farms in Kerala',
            qty: '10 Tons', qtyLabel: 'available now', demand: 'High Demand',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdYm3jq4B-hFDyZuPeqyspJvFFl024Z3FeJjCS-kKPzkIsUTJsTbg-JKJOb2biIcAmA8Cj3pb-4H0oX5zBKrCLvVlP41dnr5si7pRhNArKN2YcY19z-0Xr_1ji3hM6SU5chWnYbBfRR6Jb7wrFv1jePJbP9q3VEH0qj4hybI23K7RI8atNN7HMC_sce1LtBg4Y3N1UV2-Wf_qhSoLPTct_ZICwrIzKkCTEjx1hsqDMJS8KSj21YG_15HKXow1O2EKPDeD74BlOcVU',
            trend: '-2.4%', trendDir: 'down', bars: [60, 50, 70, 55, 65, 45, 40],
            cta: 'Lock Price @ ₹45/kg', ctaStyle: 'primary', price: '₹45/kg',
        },
        {
            id: 2, item: 'Hass Avocados', grade: 'Grade A • Conventional', location: 'Central Valley, Karnataka',
            qty: '2.5 Tons', qtyLabel: 'producting next week', demand: null,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEB_SugeQ7KNfLE-tx9DEgJ0VTmG7jyMF8hwg8uG496q7yAC7uyrm38k7pxztOVp4clrmRukHzTmvvnmmv30CvL1AyRMxPltIfj1QVg6N0UcCP6hS0fEX7bmwLbJ2llsZ4zCqNgKBMOjWlkniio8fmugUfp4S8-c--XKdjLnxsUo3M5M0lt_V3YaehViIev775cefw4Qp7h_kL_Yq8oS2dFQsG6wf837FFGgMPdDPFP_Ks1ZeqMZ5xHzQ4Jr2VoTE-ErXbutpWViA',
            trend: 'Stable', trendDir: 'flat', bars: [60, 62, 58, 60, 61, 60, 62],
            cta: 'Pre-order for Nov 15', ctaStyle: 'outline', price: '₹180/kg',
        },
        {
            id: 3, item: 'Roma Tomatoes', grade: 'Grade B • Processing', location: 'Local Co-op (Palakkad)',
            qty: '500 kg', qtyLabel: 'limited supply', demand: null,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJG3c4Yvoor-q--rE1CC5pNrQ8utgvSX9xB73ftViCdMow9rW9vARr_5FNufd2boeMJ50rG8JdZrxFmgJ_kBIirY_wyJ-5j-TJ4KLl64QaqVem7_lI9MrgMrG2MWgf5Q4E1FkWB3guaVpp6oTFvbLcl6unE4Z-W3x48GImi9ipctxe8yvuSPp3bag_P3wn1-LUbQyIKUULhBxf0dIYBmW0e_D0VmLel6T8n6EzEb6scI_3_SRNHbLphIubqsDUxM-mBv81SlRKqo',
            trend: null, bars: null,
            cta: 'Buy Now', ctaStyle: 'primary', price: '₹30/kg',
        },
    ];

    const filteredCards = supplyCards.filter(c =>
        c.item.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="stitch-buyer-dashboard">
            {/* Search + Voice */}
            <div className="stitch-search-bar">
                <div className="stitch-search-inner">
                    <span className="material-symbols-outlined stitch-search-icon">search</span>
                    <input
                        type="text"
                        placeholder="Search items (e.g. 'Potatoes')..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className="stitch-search-mic">
                        <span className="material-symbols-outlined">mic</span>
                    </button>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="stitch-filter-row no-scrollbar">
                {filters.map(f => (
                    <button
                        key={f}
                        className={`stitch-filter-chip ${activeFilter === f ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f === 'All' && <span className="material-symbols-outlined" style={{ fontSize: 18 }}>tune</span>}
                        {f === 'All' ? 'Filters' : f}
                    </button>
                ))}
            </div>

            {/* Title */}
            <div className="stitch-supply-header">
                <h2>Aggregated Supply</h2>
                <button className="stitch-view-map">View Map</button>
            </div>

            {/* Supply Cards */}
            <div className="stitch-supply-list">
                {filteredCards.map(card => (
                    <article key={card.id} className="stitch-supply-card">
                        {/* Image */}
                        <div className="stitch-supply-img">
                            <img src={card.img} alt={card.item} />
                            <div className="stitch-supply-grade">{card.grade}</div>
                            {card.demand && <div className="stitch-supply-demand">{card.demand}</div>}
                        </div>

                        {/* Content */}
                        <div className="stitch-supply-content">
                            <h3>{card.item}</h3>
                            <div className="stitch-supply-location">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                                {card.location}
                            </div>

                            <div className="stitch-supply-qty">
                                <span className="stitch-supply-qty-value">{card.qty}</span>
                                <span className="stitch-supply-qty-label">{card.qtyLabel}</span>
                            </div>

                            {/* Price Trend */}
                            {card.bars && (
                                <div className="stitch-trend-box">
                                    <div className="stitch-trend-header">
                                        <span className="stitch-trend-title">Market Price Trend</span>
                                        <div className={`stitch-trend-badge ${card.trendDir}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                                                {card.trendDir === 'down' ? 'trending_down' : 'trending_flat'}
                                            </span>
                                            {card.trend}
                                        </div>
                                    </div>
                                    <div className="stitch-trend-bars">
                                        {card.bars.map((h, i) => (
                                            <div
                                                key={i}
                                                className={`stitch-bar ${i >= card.bars.length - 2 ? (i === card.bars.length - 1 ? 'forecast' : 'current') : ''}`}
                                                style={{ height: `${h}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="stitch-trend-labels">
                                        <span>Last Week</span>
                                        <span>Forecast</span>
                                    </div>
                                </div>
                            )}

                            <button className={`stitch-supply-cta ${card.ctaStyle}`}>
                                {card.ctaStyle === 'primary' && card.cta.includes('Lock') && (
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
                                )}
                                {card.ctaStyle === 'primary' && card.cta.includes('Buy') && (
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>shopping_cart</span>
                                )}
                                {card.cta}
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* Voice FAB */}
            <button className="stitch-voice-fab">
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>mic</span>
            </button>
        </div>
    );
}
