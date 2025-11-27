import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent implements OnInit {

  produtosEncontrados: Product[] = [];
  termo: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.termo = params['q'] || '';
      
      if (this.termo) {
        this.productService.getProducts().subscribe(todosProdutos => {
          this.produtosEncontrados = todosProdutos.filter(produto => 
            produto.nome.toLowerCase().includes(this.termo.toLowerCase())
          );
        });
      }
    });
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
}