import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];

  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() { }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartCount.next(this.cartItems.length);
    alert(`${product.nome} adicionado ao carrinho!`);
  }

  getItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartCount.next(0);
    return this.cartItems;
  }

  removeItem(productId: string) {
          const index = this.cartItems.findIndex(item => item.id === productId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartCount.next(this.cartItems.length);
    }
  }
}