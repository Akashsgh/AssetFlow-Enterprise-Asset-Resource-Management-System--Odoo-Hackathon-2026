function DataTable({ rows = [] }) {
  return <div>{rows.length ? rows.join(', ') : 'No data'}</div>;
}

export default DataTable;
