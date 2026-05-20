// Client-side product fetcher — reads from static JSON
let cache = [];

export async function init() {
  await refresh();
}

async function refresh() {
  try {
    const res = await fetch('/sourdelusions/products.json');
    if (res.ok) {
      const data = await res.json();
      cache = data.map(p => ({
        _id: p.id,
        slug: p.id,
        name: p.name,
        image: p.image,
        price: p.price,
        sour: p.sour,
        weight: p.weight,
        category: p.category,
        description: p.description,
        longDescription: p.longDescription,
        ingredients: p.ingredients,
        tags: p.tags,
        featured: p.featured,
        inStock: p.inStock,
      }));
    }
  } catch {
    cache = [];
  }
}

export function getAll() {
  return cache;
}

export function getById(id) {
  return cache.find(p => p._id === id || p.slug === id) || null;
}

export function getFeatured() {
  return cache.filter(p => p.featured && p.inStock);
}

export function exportData() {
  return JSON.stringify(cache, null, 2);
}
