// Função de teste para diagnosticar problemas com armazenamento de fotos

export function testLocalStorage() {
  try {
    const testKey = "__photo_storage_test__";
    const testData = "test data 123";
    
    // Testa escrita
    localStorage.setItem(testKey, testData);
    console.log("✅ localStorage write test passed");
    
    // Testa leitura
    const retrieved = localStorage.getItem(testKey);
    if (retrieved === testData) {
      console.log("✅ localStorage read test passed");
    } else {
      console.error("❌ localStorage read test failed - data mismatch");
      return false;
    }
    
    // Limpa
    localStorage.removeItem(testKey);
    console.log("✅ localStorage cleanup successful");
    return true;
  } catch (err) {
    console.error("❌ localStorage test failed:", err.message);
    return false;
  }
}

export function testPhotoStorage() {
  const key = "employer-register-photo";
  try {
    const existing = localStorage.getItem(key);
    console.log(`📋 Photo in localStorage: ${existing ? `YES (${existing.length} chars)` : "NO"}`);
    
    if (existing) {
      // Tenta parsear como data URL
      if (existing.startsWith("data:")) {
        console.log("✅ Valid data URL format");
        const sizeInMB = (existing.length / (1024 * 1024)).toFixed(2);
        console.log(`📊 Photo size: ${sizeInMB} MB`);
        return true;
      } else {
        console.error("❌ Photo is not a valid data URL");
        return false;
      }
    }
    
    console.log("⚠️ No photo found in localStorage");
    return null;
  } catch (err) {
    console.error("❌ Error checking photo storage:", err);
    return false;
  }
}

export function clearPhotoStorage() {
  try {
    localStorage.removeItem("employer-register-photo");
    console.log("✅ Cleared employer-register-photo from localStorage");
  } catch (err) {
    console.error("❌ Error clearing photo storage:", err);
  }
}
