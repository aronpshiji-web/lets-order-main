import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { fetchPlatformStats, monthlyData } from '../../data/mockData';
import './Admin.css';

export default function Analytics() {
    const [stats, setStats] = useState({ totalSellers: 0 });
    const maxVal = Math.max(...monthlyData.map(d => Math.max(d.supply, d.demand)));

    useEffect(() => { fetchPlatformStats().then(setStats); }, []);

    return (
        <div className="page-admin">
            <div className="page-header">
                <h2>Analytics 📈</h2>
                <p className="text-muted">Platform metrics and insights</p>
            </div>
            <div className="card-grid-2">
                <Card title="Supply vs Demand">
                    <div className="bar-chart" style={{ height: '200px' }}>
                        {monthlyData.map((d, i) => (
                            <div key={i} className="bar-group">
                                <div className="bars">
                                    <div className="bar bar-supply" style={{ height: `${(d.supply / maxVal) * 100}%` }}></div>
                                    <div className="bar bar-demand" style={{ height: `${(d.demand / maxVal) * 100}%` }}></div>
                                </div>
                                <span className="bar-label">{d.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chart-legend">
                        <span><span className="legend-dot supply"></span> Supply</span>
                        <span><span className="legend-dot demand"></span> Demand</span>
                    </div>
                </Card>
                <Card title="Key Performance Indicators">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div className="insight-item">
                            <span className="insight-icon">👥</span>
                            <div><strong>User Growth: +23%</strong><p className="text-sm text-muted">Month-over-month increase across all roles</p></div>
                        </div>
                        <div className="insight-item">
                            <span className="insight-icon">💰</span>
                            <div><strong>Revenue Growth: +18%</strong><p className="text-sm text-muted">Transaction volume increasing steadily</p></div>
                        </div>
                        <div className="insight-item">
                            <span className="insight-icon">🔗</span>
                            <div><strong>Cluster Efficiency: 78%</strong><p className="text-sm text-muted">Average fulfillment rate across clusters</p></div>
                        </div>
                        <div className="insight-item">
                            <span className="insight-icon">⭐</span>
                            <div><strong>Seller Satisfaction: 4.6/5</strong><p className="text-sm text-muted">Based on {stats.totalSellers} seller reviews</p></div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
