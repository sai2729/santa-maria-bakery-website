import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  image: string; // Assuming image is a Base64 string
}
@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent {
  products: Product[] = [];
  cart: { [productId: number]: number } = {}; // Tracks quantity for each product in the cart

  constructor(private productService: ProductService,public cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  goToCart(): void {
    this.router.navigate(['/home/cart']); // Navigate to the /cart route
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
/** Add product to cart */
addToCart(productId: number): void {
  const product = this.products.find((p) => p.id === productId);
  if (product) {
    this.cartService.addToCart(product);
  }
}

/** Increment product quantity */
incrementQuantity(productId: number): void {
  this.cartService.incrementQuantity(productId);
}

/** Decrement product quantity */
decrementQuantity(productId: number): void {
  this.cartService.decrementQuantity(productId);
}

/** Get the current quantity of a product in the cart */
getQuantity(productId: number): number {
  const item = this.cartService.getCartItems().find((p) => p.id === productId);
  return item ? item.quantity : 0;
}

    /** Calculate total items in the cart */
    getTotalItems(): number {
      return Object.values(this.cart).reduce((total, quantity) => total + quantity, 0);
    }
}
