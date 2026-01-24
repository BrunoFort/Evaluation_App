export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function createPageUrl(path) {
  return `/pages/${path}`;
}
