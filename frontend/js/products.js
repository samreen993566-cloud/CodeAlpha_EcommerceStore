const API = 'http://localhost:8080/api';

// Sab products fetch karo
async function loadProducts() {
  const res = await fetch(`${API}/products`);
  const products = await res.json();

  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = '<p>No products found.</p>';
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>Rs. ${p.price}</p>
      <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">
        Add to Cart
      </button>
    </div>
  `).join('');
}

// Cart mein add karo
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Page load hone pe products load karo
loadProducts();