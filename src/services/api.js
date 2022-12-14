export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function getProductId(productId) {
  try {
    const url = `https://api.mercadolibre.com/items/${productId}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (e) {
    return e;
  }
}
