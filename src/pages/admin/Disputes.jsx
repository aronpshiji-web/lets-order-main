import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import './Admin.css';

const disputes = [
    { id: 'D001', type: 'Payment', description: 'Seller F003 reports missing payment for Order ORD003', status: 'under_review', date: '2026-02-20', parties: 'Suresh Nair ↔ Green Valley Stores' },
    { id: 'D002', type: 'Quality', description: 'Buyer B001 reports quality issue with banana delivery', status: 'under_review', date: '2026-02-18', parties: 'FreshMart ↔ Lakshmi Devi' },
    { id: 'D003', type: 'Delivery', description: 'Consumer C002 reports delayed delivery for order CO002', status: 'resolved', date: '2026-02-15', parties: 'Vijay Pillai' },
];

export default function Disputes() {
    return (
        <div className="page-admin">
            <div className="page-header">
                <h2>Disputes ⚠️</h2>
                <p className="text-muted">Handle and resolve platform disputes</p>
            </div>

            <div className="card-grid" style={{ marginBottom: 'var(--space-6)' }}>
                <Card icon="⚠️" title="Open Disputes" value={disputes.filter(d => d.status === 'under_review').length} />
                <Card icon="✅" title="Resolved" value={disputes.filter(d => d.status === 'resolved').length} />
                <Card icon="📊" title="Avg Resolution" value="2.3 days" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} className="stagger-children">
                {disputes.map(d => (
                    <div key={d.id} className="dispute-card">
                        <div className="dispute-header">
                            <div>
                                <strong>{d.id} · {d.type} Issue</strong>
                                <div className="text-sm text-muted">{d.date} · {d.parties}</div>
                            </div>
                            <StatusBadge status={d.status} />
                        </div>
                        <p className="text-sm">{d.description}</p>
                        {d.status === 'under_review' && (
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                <Button size="sm" variant="outline">Review</Button>
                                <Button size="sm" variant="ghost">Dismiss</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
