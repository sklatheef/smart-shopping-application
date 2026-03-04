/* =====================
   CART STORAGE HELPERS
===================== */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =====================
   STATUS MESSAGE
===================== */

function showStatus(message, type = "success") {
    const box = document.getElementById("statusMsg");
    if (!box) return;

    box.textContent = message;
    box.className = "status-msg show";

    if (type === "error") {
        box.classList.add("error");
    }

    setTimeout(() => {
        box.className = "status-msg";
    }, 2000);
}

/* =====================
   NAVIGATION
===================== */

function goToCart() {
    window.location.href = "cart.html";
}

function goBackToShopping() {
    window.location.href = "products.html";
}

/* =====================
   ADD TO CART
===================== */

function addToCartWithQty(btn, name, price) {
    const qtyInput = btn.parentElement.querySelector(".qty");
    const qty = Number(qtyInput.value);
    if (qty < 1) return;

    let cart = getCart();
    const item = cart.find(p => p.name === name);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    saveCart(cart);

    // Button feedback
    const originalText = btn.innerText;
    btn.innerText = "Added ✓";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    }, 800);

    qtyInput.value = 1;

    showStatus("Item added to cart");
}

/* =====================
   LOAD CART PAGE
===================== */

function loadCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");
    const emptyEl = document.getElementById("emptyCart");
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (!cartItemsEl || !totalEl) return;

    let cart = getCart();
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
        emptyEl.style.display = "block";
        totalEl.innerText = "₹ 0";
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = "0.5";
        return;
    }

    emptyEl.style.display = "none";
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <span>${item.name}</span>

            <div style="display:flex;align-items:center;gap:6px">
                <button onclick="updateQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${index}, 1)">+</button>
            </div>

            <span>₹ ${item.price * item.qty}</span>
            <button onclick="removeItem(${index})">✕</button>
        `;

        cartItemsEl.appendChild(row);
    });

    totalEl.innerText = "₹ " + total;
}

/* =====================
   CART ACTIONS
===================== */

function updateQty(index, change) {
    let cart = getCart();
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    loadCart();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
}

function checkout() {
    let cart = getCart();
    if (cart.length === 0) return;

    saveCart([]);
    showStatus("Order placed successfully");

    setTimeout(() => {
        window.location.href = "products.html";
    }, 900);
}

/* =====================
   SEARCH & FILTERS
===================== */

function searchProducts() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    filterCards(card => card.dataset.name.includes(q));
}

function filterByPrice() {
    const limit = document.getElementById("priceFilter").value;
    filterCards(card =>
        limit === "all" || Number(card.dataset.price) <= Number(limit)
    );
}

function filterProducts(category) {
    filterCards(card =>
        category === "all" || card.classList.contains(category)
    );
}

function filterCards(conditionFn) {
    const sections = document.querySelectorAll(".section");
    let anyVisible = false;

    sections.forEach(section => {
        let visibleCount = 0;

        section.querySelectorAll(".product-card").forEach(card => {
            if (conditionFn(card)) {
                card.style.display = "block";
                visibleCount++;
                anyVisible = true;
            } else {
                card.style.display = "none";
            }
        });

        section.style.display = visibleCount ? "block" : "none";
    });

    const msg = document.getElementById("noResults");
    if (msg) msg.style.display = anyVisible ? "none" : "block";
}
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        showStatus("Fill all fields", "error");
        return;
    }

    showStatus("Login successful");
    setTimeout(() => {
        window.location.href = "products.html";
    }, 800);
}
function register() {
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;

    if (!username || !password) {
        showStatus("Fill all fields", "error");
        return;
    }

    localStorage.setItem(
        "user",
        JSON.stringify({ username, password })
    );

    showStatus("Registration successful");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 800);
}



function goToRegister() {
    window.location.href = "register.html";
}


/* =====================
   INIT
===================== */

document.addEventListener("DOMContentLoaded", loadCart);
