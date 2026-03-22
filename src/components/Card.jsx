import './Card.css';

export default function Card({ title, value, icon, subtitle, trend, trendUp, className = '', onClick, children }) {
    return (
        <div className={`card ${onClick ? 'card-clickable' : ''} ${className}`} onClick={onClick}>
            {(title || icon) && (
                <div className="card-header">
                    {icon && <span className="card-icon">{icon}</span>}
                    <div className="card-header-text">
                        {title && <h4 className="card-title">{title}</h4>}
                        {subtitle && <span className="card-subtitle">{subtitle}</span>}
                    </div>
                    {trend && (
                        <span className={`card-trend ${trendUp ? 'up' : 'down'}`}>
                            {trendUp ? '↑' : '↓'} {trend}
                        </span>
                    )}
                </div>
            )}
            {value !== undefined && <div className="card-value">{value}</div>}
            {children && <div className="card-body">{children}</div>}
        </div>
    );
}
