export async function validateBusinessNumber(bn) {
  const cleaned = bn.replace(/\D/g, "");

  if (cleaned.length !== 9) {
    throw new Error("Business Number must have 9 digits");
  }

  // Simulação de retorno da API
  return {
    companyName: "Demo Company Ltd.",
  };
}
