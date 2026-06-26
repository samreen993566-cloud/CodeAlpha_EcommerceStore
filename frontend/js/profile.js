async function loadProfile() {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Name aur email dikhao
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-email').textContent = email || 'No email saved';

  // Avatar - pehla letter
  document.getElementById('profile-avatar').textContent = name ? name[0].toUpperCase() : '?';

  // Orders fetch karo
  const res = await fetch(`${API}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const orders = await res.json();
  const orderList = document.getElementById('order-list');

  if (orders.length === 0) {
    orderList.innerHTML = '<p style="color:#888;">No orders yet.</p>';
    return;
  }

  orderList.innerHTML = orders.map((order, i) => `
    <div class="order-card">
      <p><strong>Order ${i + 1}</strong></p>
      <p>Total: Rs. ${order.totalPrice}</p>
      <p>Status: ${order.status}</p>
      <p style="font-size:0.85rem; color:#888;">${new Date(order.createdAt).toLocaleDateString()}</p>
    </div>
  `).join('');
}

loadProfile();