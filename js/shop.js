document.addEventListener('DOMContentLoaded', () => {

  const collections = {
    majapahit: majapahitProducts,
    dacha: dachaProducts,
    cinere: cinereProducts
  };

  let currentCollection = 'majapahit';
  let currentCategory = 'all';

  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('category-filter');
  const collectionButtons = document.querySelectorAll('.collection-btn');

  renderCategories();
  renderProducts();

  collectionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      collectionButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCollection = btn.dataset.collection;
      currentCategory = 'all';

      renderCategories();
      renderProducts();
    });
  });

  function renderCategories() {
    const products = collections[currentCollection];
    const categories = [...new Set(products.map(p => p.category))];

    categoryFilter.innerHTML = `
      <button class="btn btn-sm btn-outline-dark me-2 mb-2 category-btn active" data-category="all">
        All
      </button>
    `;

    categories.forEach(cat => {
      categoryFilter.innerHTML += `
        <button class="btn btn-sm btn-outline-dark me-2 mb-2 category-btn" data-category="${cat}">
          ${capitalize(cat)}
        </button>
      `;
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentCategory = btn.dataset.category;
        renderProducts();
      });
    });
  }

  function renderProducts() {
    const products = collections[currentCollection];
    const filtered = currentCategory === 'all'
      ? products
      : products.filter(p => p.category === currentCategory);

    productList.innerHTML = '';

    filtered.forEach(p => {
      productList.innerHTML += `
        <div class="col-12 col-md-4 col-lg-3 mb-5">
          <div class="product-item text-center">
            <img src="${p.image}" class="img-fluid product-thumbnail">
            <h3 class="product-title">${p.name}</h3>
            <strong class="product-price">${p.price}</strong>
            <br>
            <a href="${p.link}" class="btn btn-sm btn-outline-dark mt-2">
              View Detail
            </a>
          </div>
        </div>
      `;
    });
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

});
