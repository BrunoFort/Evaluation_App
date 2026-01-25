// src/features/reference/referenceTokensStore.js

// Simulação em memória. Em produção, isso estaria no backend.
const referenceTokens = new Map();
// key: token
// value: { employeeId, createdAt }

export function saveReferenceToken(token, employeeId) {
  referenceTokens.set(token, {
    employeeId,
    createdAt: new Date().toISOString(),
  });
}

export function validateReferenceToken(token, employeeId) {
  const entry = referenceTokens.get(token);
  if (!entry) return false;

  if (String(entry.employeeId) !== String(employeeId)) return false;

  // Aqui você poderia validar expiração, uso único, etc.
  return true;
}
