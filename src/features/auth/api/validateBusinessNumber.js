export async function validateBusinessNumber(bn) {
  // Aqui estamos simulando a chamada real.
  // Depois você pode substituir pela API oficial do Canadá.

  const cleaned = bn.replace(/\D/g, "");

  if (cleaned.length !== 9) {
    throw new Error("Business Number must have 9 digits");
  }

  // Simulação de retorno da API
  return {
    companyName: "Demo Company Ltd.",
  };
}
