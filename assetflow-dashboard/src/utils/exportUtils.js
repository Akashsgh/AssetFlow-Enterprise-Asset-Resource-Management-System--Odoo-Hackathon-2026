// Triggers a browser download for a Blob returned by the export APIs.
export function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function buildReportFilename(reportId, format) {
  const date = new Date().toISOString().slice(0, 10);
  return `${reportId}-report-${date}.${format}`;
}
