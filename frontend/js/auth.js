// Navbar update karo
function updateNavbar() {
  const name = localStorage.getItem('name');
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  if (name) {
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="cart.html">Cart 🛍️</a>
      <span style="color:white; margin-left:1.5rem;">Hi, ${name}!</span>
      <a href="#" onclick="logout()" style="margin-left:1.5rem;">Logout</a>
    `;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  window.location.href = 'index.html';
}

async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Registered successfully! Please login.');
    window.location.href = 'login.html';
  } else {
    alert(data.message);
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    window.location.replace('index.html');   // ✅ SIRF YEH
  } else {
    alert(data.message);
  }
}

updateNavbar();