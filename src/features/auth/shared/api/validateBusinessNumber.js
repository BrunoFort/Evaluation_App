export async function validateBusinessNumber(bn) {
  const cleaned = bn.replace(/\D/g, "");

  if (cleaned.length !== 9) {
    throw new Error("Business Number must have 9 digits");
  }

  // Simulated API response
  return {
    companyName: "Demo Company Ltd.",
  };
}
