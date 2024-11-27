import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { [productId: number]: { id: number; name: string; price: number; quantity: number } } = {};

  /** Add a product to the cart */
  addToCart(product: { id: number; name: string; price: number }): void {
    if (this.cart[product.id]) {
      this.cart[product.id].quantity++;
    } else {
      this.cart[product.id] = { ...product, quantity: 1 };
    }
  }

  /** Increment product quantity */
  incrementQuantity(productId: number): void {
    if (this.cart[productId]) {
      this.cart[productId].quantity++;
    }
  }

  /** Decrement product quantity */
  decrementQuantity(productId: number): void {
    if (this.cart[productId]) {
      this.cart[productId].quantity--;
      if (this.cart[productId].quantity <= 0) {
        delete this.cart[productId];
      }
    }
  }

  /** Get all cart items */
  getCartItems(): any[] {
    return Object.values(this.cart);
  }

  /** Calculate the total price */
  getTotalPrice(): number {
    return Object.values(this.cart).reduce((total, item) => total + item.price * item.quantity, 0);
  }
}