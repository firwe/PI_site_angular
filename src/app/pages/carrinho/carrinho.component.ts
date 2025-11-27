import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    // Truque para limpar o "R$" e somar os números
    this.total = this.cartItems.reduce((acc, item) => {
      const priceNumber = parseFloat(item.preco.replace('R$', '').replace(',', '.').trim());
      return acc + priceNumber;
    }, 0);
  }

  removerItem(item: Product) {
    this.cartService.removeItem(item.id);
    this.loadCart(); // Recarrega a lista após remover
  }

  limparCarrinho() {
    this.cartService.clearCart();
    this.loadCart();
  }

  finalizarCompra() {
    if (this.cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    alert('Compra finalizada com sucesso! (Simulação)');
    this.limparCarrinho();
  }
}