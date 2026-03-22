import './DataTable.css';

export default function DataTable({ columns, data, onRowClick, emptyMessage = 'No data available' }) {
    if (!data || data.length === 0) {
        return (
            <div className="table-empty">
                <span className="table-empty-icon">📭</span>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} style={col.width ? { width: col.width } : {}}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={row.id || idx} onClick={() => onRowClick?.(row)} className={onRowClick ? 'clickable' : ''}>
                            {columns.map(col => (
                                <td key={col.key}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
