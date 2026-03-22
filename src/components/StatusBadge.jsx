import './StatusBadge.css';

const statusConfig = {
    pending: { label: 'Pending', color: 'warning' },
    processing: { label: 'Processing', color: 'info' },
    aggregated: { label: 'Aggregated', color: 'info' },
    confirmed: { label: 'Confirmed', color: 'success' },
    delivered: { label: 'Delivered', color: 'success' },
    fulfilled: { label: 'Fulfilled', color: 'success' },
    matched: { label: 'Matched', color: 'success' },
    open: { label: 'Open', color: 'primary' },
    sold: { label: 'Sold', color: 'success' },
    completed: { label: 'Completed', color: 'success' },
    partial: { label: 'Partial', color: 'warning' },
    cancelled: { label: 'Cancelled', color: 'danger' },
    out_for_delivery: { label: 'Out for Delivery', color: 'info' },
    active: { label: 'Active', color: 'success' },
    inactive: { label: 'Inactive', color: 'danger' },
    resolved: { label: 'Resolved', color: 'success' },
    under_review: { label: 'Under Review', color: 'warning' },
};

export default function StatusBadge({ status, size = 'sm' }) {
    const config = statusConfig[status] || { label: status, color: 'default' };
    return (
        <span className={`status-badge status-${config.color} status-${size}`}>
            <span className="status-dot"></span>
            {config.label}
        </span>
    );
}
