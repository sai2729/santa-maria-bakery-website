import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProductWithImage(product: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    formData.append('status', product.status);
    formData.append('image', image); // Attach the image file
  
    return this.http.post('http://localhost:8080/api/products/upload', formData);
  }


  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}