// Data
const products = [
    { id: 1, name: 'Aspirin', category: 'Medicines', price: 150, description: 'Pain reliever and fever reducer', image_url: 'as.jpg' },
    { id: 2, name: 'Paracetamol', category: 'Medicines', price: 100, description: 'Effective pain and fever medication', image_url: 'paracetamol.jpg' },
    { id: 3, name: 'Cough Syrup', category: 'Medicines', price: 200, description: 'Effective cough relief syrup', image_url: 'coughsyrup.jpg' },
    { id: 4, name: 'Antibiotic Cream', category: 'Medicines', price: 250, description: 'Topical antibiotic cream for wounds', image_url: 'cream.jpg' },
    { id: 5, name: 'Throat Lozenges', category: 'Medicines', price: 120, description: 'Soothing throat lozenges', image_url: 'throat.jpg' },
    { id: 6, name: 'Vitamin C', category: 'Supplements', price: 300, description: 'Boost immune system with Vitamin C', image_url: 'vitamenc.jpg' },
    { id: 7, name: 'Iron Tablet', category: 'Supplements', price: 250, description: 'Iron supplement for anemia', image_url: 'irontablet.jpg' },
    { id: 8, name: 'Calcium Tablet', category: 'Supplements', price: 280, description: 'Strong bones with Calcium supplement', image_url: 'calcium.jpg' },
    { id: 9, name: 'Multivitamin', category: 'Supplements', price: 350, description: 'Complete multivitamin for daily health', image_url: 'multivitamen.jpg' },
    { id: 10, name: 'Omega-3 Capsules', category: 'Supplements', price: 400, description: 'Heart health support with Omega-3', image_url: 'omega3.jpg' },
    { id: 11, name: 'Digital Thermometer', category: 'Medical Devices', price: 600, description: 'Quick and accurate temperature reading', image_url: 'thermometer.jpg' },
    { id: 12, name: 'Blood Pressure Monitor', category: 'Medical Devices', price: 2500, description: 'Digital BP monitor with memory', image_url: 'BloodPressure.jpg' },
    { id: 13, name: 'Pulse Oximeter', category: 'Medical Devices', price: 1800, description: 'Measure blood oxygen level', image_url: 'pulse.jpg' },
    { id: 14, name: 'Glucose Meter', category: 'Medical Devices', price: 1500, description: 'Diabetes management device', image_url: 'glucose.jpg' },
    { id: 15, name: 'Weighing Scale', category: 'Medical Devices', price: 1200, description: 'Digital weight scale', image_url: 'waight.jpg' },
    { id: 16, name: 'Hand Sanitizer', category: 'Wellness', price: 80, description: 'Antibacterial hand sanitizer', image_url: 'sanatizer.jpg' },
    { id: 17, name: 'Face Mask', category: 'Wellness', price: 50, description: 'Pack of 50 protective face masks', image_url: 'mask.jpg' },
    { id: 18, name: 'First Aid Kit', category: 'Wellness', price: 800, description: 'Complete home first aid kit', image_url: 'firstaid.jpg' },
    { id: 19, name: 'Heating Pad', category: 'Wellness', price: 900, description: 'Electric heating pad for pain relief', image_url: 'heatingpad.jpg' },
    { id: 20, name: 'Ice Pack', category: 'Wellness', price: 350, description: 'Reusable ice pack for injuries', image_url: 'icepack.jpg' },
];

// State
let currentUser = null;
let users = [];
let cart = [];
let orders = [];
let selectedProduct = null;
let currentFilter = 'All';

// Helper
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'shop-page') {
        renderShopProducts();
    } else if (pageId === 'home-page') {
        renderFeaturedProducts();
    } else if (pageId === 'cart-page') {
        renderCart();
    } else if (pageId === 'profile-page') {
        renderProfile();
    } else if (pageId === 'checkout-page') {
        renderCheckoutSummary();
    }

    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[id^="cart-count"]').forEach(el => {
        el.textContent = count;
    });
}

// LoginForm
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('login-error').textContent = '';
        showPage('home-page');
    } else {
        document.getElementById('login-error').textContent = 'Invalid email or password';
    }
});

// Signup-Form
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('signup-error').textContent = 'Passwords do not match';
        return;
    }

    if (users.find(u => u.email === email)) {
        document.getElementById('signup-error').textContent = 'Email already registered';
        return;
    }

    const newUser = { name, email, password, orders: [] };
    users.push(newUser);
    currentUser = newUser;
    document.getElementById('signup-error').textContent = '';
    showPage('home-page');
});

// Logout
function logout() {
    currentUser = null;
    cart = [];
    showPage('login-page');
}

// Render Featured Prd
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    container.innerHTML = '';

    const featured = products.slice(0, 8);
    featured.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Render Shop Prd
function renderShopProducts() {
    const container = document.getElementById('shop-products');
    container.innerHTML = '';

    const filtered = currentFilter === 'All' ? products : products.filter(p => p.category === currentFilter);
    filtered.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Create Product Crd
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image_url}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
                <p class="product-description">${product.description}</p>
            `;

    card.addEventListener('click', function () {
        selectedProduct = product;
        renderProductDetail();
        showPage('product-detail-page');
    });

    return card;
}

// Render Product Detail
function renderProductDetail() {
    if (!selectedProduct) return;

    const container = document.getElementById('product-detail-content');
    container.innerHTML = `
                <div class="product-detail-image">
                    <img src="${selectedProduct.image_url}" alt="${selectedProduct.name}">
                </div>
                <h2 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-16);">${selectedProduct.name}</h2>
                <div class="product-price" style="font-size: var(--font-size-3xl); margin-bottom: var(--space-16);">₹${selectedProduct.price}</div>
                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-16); line-height: 1.6;">${selectedProduct.description}</p>
                <p style="margin-bottom: var(--space-16);"><strong>Category:</strong> ${selectedProduct.category}</p>
                <div class="quantity-selector">
                    <label><strong>Quantity:</strong></label>
                    <input type="number" id="product-quantity" value="1" min="1">
                </div>
                <div class="button-group">
                    <button class="btn btn-primary" onclick="addToCartFromDetail()">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="showPage('shop-page')">Back to Shop</button>
                </div>
            `;
}

// Add to Crt from Detail
function addToCartFromDetail() {
    if (!selectedProduct) return;

    const quantity = parseInt(document.getElementById('product-quantity').value);
    const existingItem = cart.find(item => item.product.id === selectedProduct.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product: selectedProduct, quantity });
    }

    updateCartCount();
    showPage('cart-page');
}

// Filter Prd
function filterProducts(category) {
    currentFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderShopProducts();
}

// Filter by Crt from Home
function filterByCategory(category) {
    currentFilter = category;
    showPage('shop-page');

    setTimeout(() => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === category) {
                btn.classList.add('active');
            }
        });
    }, 0);
}

// Render Crt
function renderCart() {
    const container = document.getElementById('cart-content');

    if (cart.length === 0) {
        container.innerHTML = `
                    <div class="empty-cart">
                        <p>Your cart is empty</p>
                        <button class="btn btn-primary" onclick="showPage('shop-page')">Start Shopping</button>
                    </div>
                `;
        return;
    }

    let tableHTML = `
                <div class="cart-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

    cart.forEach((item, index) => {
        const total = item.product.price * item.quantity;
        tableHTML += `
                    <tr>
                        <td>${item.product.name}</td>
                        <td>₹${item.product.price}</td>
                        <td>
                            <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)">
                        </td>
                        <td>₹${total}</td>
                        <td>
                            <button class="btn btn-secondary btn-small" onclick="removeFromCart(${index})">Remove</button>
                        </td>
                    </tr>
                `;
    });

    tableHTML += `
                        </tbody>
                    </table>
                </div>
            `;

    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    tableHTML += `
                <div class="cart-summary">
                    <div class="cart-summary-row">
                        <span>Subtotal:</span>
                        <span>₹${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="cart-summary-row">
                        <span>Tax (5%):</span>
                        <span>₹${tax.toFixed(2)}</span>
                    </div>
                    <div class="cart-summary-row total">
                        <span>Total:</span>
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                </div>
                <div class="button-group">
                    <button class="btn btn-primary" onclick="showPage('checkout-page')">Proceed to Checkout</button>
                    <button class="btn btn-secondary" onclick="showPage('shop-page')">Continue Shopping</button>
                </div>
            `;

    container.innerHTML = tableHTML;
}

// Update Crt Quantity
function updateCartQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    updateCartCount();
    renderCart();
}

// Remove from Crt
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Render Checkout Summary
function renderCheckoutSummary() {
    const container = document.getElementById('checkout-summary');
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    let itemsHTML = '<h3 style="margin-bottom: var(--space-16);">Order Summary</h3>';
    cart.forEach(item => {
        itemsHTML += `
                    <div class="cart-summary-row">
                        <span>${item.product.name} x ${item.quantity}</span>
                        <span>₹${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
    });

    itemsHTML += `
                <div class="cart-summary-row">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Tax (5%):</span>
                    <span>₹${tax.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row total">
                    <span>Total:</span>
                    <span>₹${total.toFixed(2)}</span>
                </div>
            `;

    container.innerHTML = itemsHTML;
}

// Checkout Form
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const order = {
        date: new Date().toLocaleDateString(),
        items: [...cart],
        total: total.toFixed(2),
        status: 'Processing'
    };

    if (!currentUser.orders) {
        currentUser.orders = [];
    }
    currentUser.orders.push(order);

    cart = [];
    updateCartCount();
    showPage('order-confirmation-page');
});

// Render Profile
function renderProfile() {
    if (!currentUser) return;

    const infoContainer = document.getElementById('profile-info');
    infoContainer.innerHTML = `
                <p><strong>Name:</strong> ${currentUser.name}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
            `;

    const orderContainer = document.getElementById('order-history');
    if (!currentUser.orders || currentUser.orders.length === 0) {
        orderContainer.innerHTML = '<p>No orders yet</p>';
    } else {
        let ordersHTML = '';
        currentUser.orders.forEach((order, index) => {
            ordersHTML += `
                        <div class="order-item">
                            <p><strong>Order ${index + 1}</strong> - ${order.date}</p>
                            <p>Total: ₹${order.total}</p>
                            <p>Status: ${order.status}</p>
                        </div>
                    `;
        });
        orderContainer.innerHTML = ordersHTML;
    }
}

// Contact Form
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});

// Initialize
updateCartCount();