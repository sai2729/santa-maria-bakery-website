// 紀錄購物車內的商品
let cart = [];
let totalPrice = 0;

// 添加商品到購物車的功能
function addToCart(product, price) {
    // 檢查商品是否已經在購物車內
    const item = cart.find(item => item.product === product);

    if (item) {
        // 如果商品已經在購物車內，增加數量
        item.quantity += 1;
    } else {
        // 如果商品不在購物車內，添加新的商品
        cart.push({ product, price, quantity: 1 });
    }

    // 更新總價格
    totalPrice += price;

    // 重新渲染購物清單
    renderCart();
}

// 渲染購物車內容
function renderCart() {
    const cartTable = document.getElementById('cart');
    
    // 清除之前的購物車內容
    cartTable.innerHTML = `
        <tr>
            <th>商品</th>
            <th>數量</th>
            <th>價格</th>
        </tr>
    `;
    
    // 顯示購物車內的所有商品
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>$${item.price * item.quantity}</td>
        `;
        cartTable.appendChild(row);
    });

    // 更新總價格
    document.getElementById('totalPrice').innerText = totalPrice;
}
