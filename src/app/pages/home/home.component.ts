import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  lancamentos: Product[] = [];
  maisVendidos: Product[] = [];
  
  currentSlide = 0;
  banners = ['assets/carrossel/oferta2.png', 'assets/carrossel/oferta1.png', 'assets/carrossel/oferta3.png'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.productService.getLancamentos().subscribe(data => this.lancamentos = data);
    this.productService.getMaisVendidos().subscribe(data => this.maisVendidos = data);
    
    setInterval(() => { this.nextSlide(); }, 5000);
  }

  adicionarAoCarrinho(event: Event, produto: Product) {
    event.stopPropagation(); 
    event.preventDefault(); 
    this.cartService.addToCart(produto);
  }

  toggleFavorito(event: Event, produtoId: string) {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistService.toggleWishlist(produtoId);
  }

  isFavorito(produtoId: string): boolean {
    return this.wishlistService.isInWishlist(produtoId);
  }

  prevSlide() { this.currentSlide = (this.currentSlide - 1 + this.banners.length) % this.banners.length; }
  nextSlide() { this.currentSlide = (this.currentSlide + 1) % this.banners.length; }
}