export function loadPhoto(key) {
  if (!key) return null;
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error("Photo load error:", err);
    return null;
  }
}

export function savePhoto(key, dataUrl) {
  if (!key || !dataUrl) return;
  try {
    localStorage.setItem(key, dataUrl);
  } catch (err) {
    console.error("Photo save error:", err);
  }
}

export function removePhoto(key) {
  if (!key) return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Photo remove error:", err);
  }
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
