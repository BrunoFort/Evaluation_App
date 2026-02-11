export function loadPhoto(key) {
  if (!key) {
    console.warn("⚠️ loadPhoto: chave vazia");
    return null;
  }
  try {
    const data = localStorage.getItem(key);
    if (data) {
      const sizeInMB = (data.length / (1024 * 1024)).toFixed(2);
      console.log(`✅ Foto carregada de localStorage (${sizeInMB} MB) com chave: ${key}`);
      return data;
    } else {
      console.log(`⚠️ Nenhuma foto encontrada em localStorage com chave: ${key}`);
      return null;
    }
  } catch (err) {
    console.error("❌ Erro ao carregar foto:", err.message, { key });
    return null;
  }
}

export function savePhoto(key, dataUrl) {
  if (!key || !dataUrl) {
    console.warn("⚠️ savePhoto: chave ou dataUrl vazio", { key, dataUrlLength: dataUrl?.length });
    return false;
  }
  try {
    const sizeInMB = (dataUrl.length / (1024 * 1024)).toFixed(2);
    localStorage.setItem(key, dataUrl);
    console.log(`✅ Foto salva em localStorage (${sizeInMB} MB) com chave: ${key}`);
    return true;
  } catch (err) {
    console.error("❌ Erro ao salvar foto:", err.message, {
      errorName: err.name,
      errorCode: err.code,
      key,
      dataUrlLength: dataUrl?.length
    });
    
    // Se for erro de quota, tenta limpar e avisar
    if (err.name === "QuotaExceededError") {
      console.error("🔴 localStorage está cheio! Necessário liberar espaço.");
    }
    return false;
  }
}

export function removePhoto(key) {
  if (!key) {
    console.warn("⚠️ removePhoto: chave vazia");
    return false;
  }
  try {
    localStorage.removeItem(key);
    console.log(`✅ Foto removida de localStorage com chave: ${key}`);
    return true;
  } catch (err) {
    console.error("❌ Erro ao remover foto:", err.message, { key });
    return false;
  }
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      console.error("❌ readFileAsDataUrl: arquivo vazio");
      reject(new Error("Arquivo vazio"));
      return;
    }
    
    console.log(`📖 Lendo arquivo como Data URL: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    const reader = new FileReader();
    
    reader.onload = () => {
      console.log(`✅ Data URL criada com sucesso (${(reader.result.length / 1024).toFixed(2)} KB)`);
      resolve(reader.result);
    };
    
    reader.onerror = () => {
      console.error("❌ Erro ao ler arquivo:", reader.error);
      reject(reader.error);
    };
    
    reader.readAsDataURL(file);
  });
}
