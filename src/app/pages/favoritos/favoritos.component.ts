import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {

  produtosFavoritos: Product[] = [];

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    const idsFavoritos = this.wishlistService.getWishlist();

    this.productService.getProducts().subscribe(todosProdutos => {
      this.produtosFavoritos = todosProdutos.filter(p => idsFavoritos.has(p.id));
    });
  }

  removerFavorito(produto: Product) {
    this.wishlistService.toggleWishlist(produto.id);
    this.carregarFavoritos();
  }

  adicionarAoCarrinho(event: Event, produto: Product) {
    event.stopPropagation();
    this.cartService.addToCart(produto);
  }
}