let cart = [];

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = cartItems.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn remove-from-cart" data-name="${item.name}">Remove</button></td>
        `;
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSection = document.getElementById('cart-section');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
        });
    });

    cartSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const name = e.target.dataset.name;
            removeFromCart(name);
        }
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your order! This is where you would proceed to payment.');
    });
});
