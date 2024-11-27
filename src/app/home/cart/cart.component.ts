import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  /** Load cart items */
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  /** Update quantity of an item */
  updateQuantity(productId: number, change: number): void {
    if (change > 0) {
      this.cartService.incrementQuantity(productId);
    } else {
      this.cartService.decrementQuantity(productId);
    }
    this.loadCartItems();
  }

  /** Remove an item from the cart */
  removeItem(productId: number): void {
    this.cartService.decrementQuantity(productId); // Set quantity to 0 to remove
    this.loadCartItems();
  }

  /** Calculate subtotal */
  calculateSubtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  /** Calculate total (includes shipping, discounts, etc.) */
  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const Tax = 5.0; // Example static shipping
    return subtotal + Tax;
  }
}