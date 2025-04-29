const API_URL = "https://sportzone-six.vercel.app/api";

// Front - Index
if (document.getElementById('productList')) {
  fetch(`${API_URL}/products`)
    .then(res => res.json())
    .then(data => {
      const productList = document.getElementById('productList');
      data.forEach(p => {
        productList.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="${p.image}" class="card-img-top" alt="${p.name}">
              <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text">${p.description}</p>
              </div>
            </div>
          </div>
        `;
      });
    });
}

// Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
 
    const emailValue = email.value
    const passwordValue = password.value

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email:emailValue, password:passwordValue })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      alert('Error de login');
    }
  });
}

// Dashboard
if (document.getElementById('adminProductList')) {
  const token = localStorage.getItem('token');
  if (!token) window.location.href = 'login.html';

  const adminProductList = document.getElementById('adminProductList');

  async function loadProducts() {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    adminProductList.innerHTML = '';
    data.forEach(p => {
      adminProductList.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text">${p.description}</p>
              <button class="btn btn-danger" onclick="deleteProduct(${p.id})">Eliminar</button>
            </div>
          </div>
        </div>
      `;
    });
  }

  document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, description, image })
    });

    loadProducts();
  });

  const logout = ()=>{
    localStorage.removeItem('token');
    window.location.reload();
  }

  window.deleteProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    loadProducts();
  };

  loadProducts();
}
