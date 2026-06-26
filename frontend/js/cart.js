function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty!</p>';
    cartTotal.innerHTML = '';
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart.map(item => {
    total += item.price * item.quantity;
    return `
      <div style="display:flex; justify-content:space-between; padding:0.8rem 0; border-bottom:1px solid #eee;">
        <span>${item.name}</span>
        <span>Rs. ${item.price} x ${item.quantity}</span>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
  }).join('');

  cartTotal.innerHTML = `<p>Total: Rs. ${total}</p>`;
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

async function checkout() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const items = cart.map(item => ({
    product: item.id,
    quantity: item.quantity
  }));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ items, totalPrice: total })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.removeItem('cart');
    window.location.href = 'checkout.html';
  } else {
    alert(data.message);
  }
}

loadCart();