document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const responseMessage = document.createElement("p");
    responseMessage.textContent = "Thank you for contacting us!";
    responseMessage.style.color = "green";
    responseMessage.style.display = "none";
    form.appendChild(responseMessage);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // يمنع إرسال النموذج الفعلي
        responseMessage.style.display = "block";
        form.reset(); // مسح المدخلات بعد الإرسال
    });
});
function increaseQuantity(button) {
    let quantitySpan = button.parentElement.querySelector(".quantity");
    let currentQuantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQuantity + 1;
}

function decreaseQuantity(button) {
    let quantitySpan = button.parentElement.querySelector(".quantity");
    let currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
        quantitySpan.textContent = currentQuantity - 1;
    }
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function increaseQuantity(button) {
    let quantitySpan = button.parentElement.querySelector(".quantity");
    let currentQuantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQuantity + 1;
}

function decreaseQuantity(button) {
    let quantitySpan = button.parentElement.querySelector(".quantity");
    let currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
        quantitySpan.textContent = currentQuantity - 1;
    }
}

function addToCart(button) {
    let productDiv = button.parentElement;
    let productName = productDiv.querySelector("h3").textContent;
    let price = parseFloat(productDiv.querySelector(".price").textContent.replace("$", ""));
    let quantity = parseInt(productDiv.querySelector(".quantity").textContent);

    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity} x ${productName} added to cart!`);
}

function goToCart() {
    window.location.href = "My Cart.html";
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    // مسح المحتوى الحالي حتى لا تتكرر العناصر
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <span>${item.name} (x<span class="cart-quantity">${item.quantity}</span>)</span>
            <span>$${itemTotal.toFixed(2)}</span>
            <button onclick="increaseCartQuantity(${index})">➕</button>
            <button onclick="decreaseCartQuantity(${index})">➖</button>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function increaseCartQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function decreaseCartQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); // إزالة العنصر لو وصل إلى صفر
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart");
    window.location.href = "Product.html"; // يرجع للصفحة الرئيسية بعد الدفع
}

// تحميل السلة عند فتح صفحة cart.html
if (document.getElementById("cart-items")) {
    loadCart();
}

function checkout() {
    alert("Proceeding to checkout...");
}
function showPaymentOptions() {
    // إظهار الأوبشنات بعد الضغط على زرار الشيك أوت
    document.getElementById("payment-options").style.display = "block";
}

function processPayment(method) {
    alert("You selected " + method + " for payment!");
    // هنا ممكن تضيفي أكتر حسب الحاجة
}
