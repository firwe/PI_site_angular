import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?categoria=${categoryName}`);
  }

  getLancamentos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?section=lancamentos`);
  }

  getMaisVendidos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?section=mais-vendidos`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${updatedProduct.id}`, updatedProduct);
  }

  searchProducts(termo: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?nome_like=${termo}`);
  }
}