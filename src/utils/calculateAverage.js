export function calculateAverage(values) {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + Number(v), 0);
  return Number((sum / values.length).toFixed(2));
}
