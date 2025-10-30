import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  nomeCategoria: string | null = null; 
  produtosDaCategoria: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nomeCategoria = params.get('nome');
      
      if (this.nomeCategoria) {
        this.productService.getProductsByCategory(this.nomeCategoria).subscribe(data => {
          this.produtosDaCategoria = data;
        });
      }
    });
  }
}