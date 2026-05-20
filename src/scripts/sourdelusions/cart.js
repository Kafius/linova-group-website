// Cart store — localStorage-backed, event-driven
const STORAGE_KEY = 'sour-delusions-cart';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items } }));
}

export function getItems() {
  return load();
}

export function addItem(product) {
  const items = load();
  const existing = items.find(i => i.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ ...product, qty: 1 });
  }
  save(items);
}

export function removeItem(name) {
  save(load().filter(i => i.name !== name));
}

export function updateQty(name, qty) {
  const items = load();
  const item = items.find(i => i.name === name);
  if (!item) return;
  if (qty <= 0) {
    save(items.filter(i => i.name !== name));
  } else {
    item.qty = qty;
    save(items);
  }
}

export function clearCart() {
  save([]);
}

export function getTotal() {
  return load().reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function getCount() {
  return load().reduce((sum, i) => sum + i.qty, 0);
}
