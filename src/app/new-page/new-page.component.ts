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
}
