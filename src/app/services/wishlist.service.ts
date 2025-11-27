import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlist: Set<string> = new Set();

  constructor() { }

  getWishlist(): Set<string> {
    return this.wishlist;
  }

  toggleWishlist(productId: string) {
    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
    } else {
      this.wishlist.add(productId); 
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist.has(productId);
  }
}