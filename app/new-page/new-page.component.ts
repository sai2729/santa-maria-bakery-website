import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {
  cartItems = [
    { name: '商品1', price: 100 },
    { name: '商品2', price: 200 },
    // 添加更多商品
  ];
  handleClick() {
    console.log('Button clicked!');
  }

  // 新增的函数
  addToCart(name: string, price: number) {
    const orderList = document.getElementById('order-list');
    if (!orderList) return; // 添加空值检查以避免错误
    
    // 创建新的列表项并立即显示订单记录
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - $${price}`;
    orderList.appendChild(listItem);
    
    // 立即更新订单记录显示
    orderList.style.display = 'block'; // 确保订单记录部分可见
  }

  // 新增的函数：计算面包数量和总价格
  countBreadAndCalculateTotal() {
    const breadItems = this.cartItems.filter(item => item.name.includes('面包'));
    const totalPrice = breadItems.reduce((sum, item) => sum + item.price, 0);
    
    console.log(`面包数量: ${breadItems.length}, 总价格: $${totalPrice}`);
  }
}
