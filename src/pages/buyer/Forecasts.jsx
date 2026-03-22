import Card from '../../components/Card';
import { monthlyData } from '../../data/mockData';
import './Buyer.css';

export default function Forecasts() {
    const maxTxn = Math.max(...monthlyData.map(d => d.transactions));

    return (
        <div className="page-buyer">
            <div className="page-header">
                <h2>Supply Forecasts 📈</h2>
                <p className="text-muted">Trend analysis and supply predictions</p>
            </div>

            <div className="card-grid-2">
                <Card title="Monthly Transactions">
                    <div className="bar-chart" style={{ height: '180px' }}>
                        {monthlyData.map((d, i) => (
                            <div key={i} className="bar-group">
                                <div className="bars">
                                    <div className="bar bar-supply" style={{ height: `${(d.transactions / maxTxn) * 100}%`, width: '28px' }} title={`${d.transactions} transactions`}></div>
                                </div>
                                <span className="bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Key Insights">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div className="insight-item">
                            <span className="insight-icon">📈</span>
                            <div>
                                <strong>Supply Growing</strong>
                                <p className="text-sm text-muted">Supply increased 30% over last 3 months</p>
                            </div>
                        </div>
                        <div className="insight-item">
                            <span className="insight-icon">🌾</span>
                            <div>
                                <strong>Top Item: Rice</strong>
                                <p className="text-sm text-muted">Rice accounts for 35% of total volume</p>
                            </div>
                        </div>
                        <div className="insight-item">
                            <span className="insight-icon">💰</span>
                            <div>
                                <strong>Price Trend: Stable</strong>
                                <p className="text-sm text-muted">Average prices held steady this quarter</p>
                            </div>
                        </div>
                        <div className="insight-item">
                            <span className="insight-icon">📍</span>
                            <div>
                                <strong>Hot Region: Palakkad</strong>
                                <p className="text-sm text-muted">Highest supply concentration area</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="Supply Forecast – Next 6 Months" style={{ marginTop: 'var(--space-6)' }}>
                <div className="forecast-table">
                    <div className="mini-table">
                        <div className="mini-row mini-header">
                            <span>Item</span><span>Current</span><span>Forecast</span><span>Change</span>
                        </div>
                        {[
                            { item: '🌾 Rice', current: '1,300 kg', forecast: '2,100 kg', change: '+62%', up: true },
                            { item: '🍌 Banana', current: '500 dozen', forecast: '800 dozen', change: '+60%', up: true },
                            { item: '🌶️ Pepper', current: '50 kg', forecast: '120 kg', change: '+140%', up: true },
                            { item: '🫚 Ginger', current: '150 kg', forecast: '200 kg', change: '+33%', up: true },
                            { item: '🥥 Coconut', current: '1,000 pcs', forecast: '1,500 pcs', change: '+50%', up: true },
                        ].map((r, i) => (
                            <div key={i} className="mini-row">
                                <span>{r.item}</span>
                                <span>{r.current}</span>
                                <span className="font-semibold">{r.forecast}</span>
                                <span className={`card-trend ${r.up ? 'up' : 'down'}`}>{r.change}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
