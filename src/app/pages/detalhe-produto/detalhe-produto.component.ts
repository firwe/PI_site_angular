import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-detalhe-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-produto.component.html',
  styleUrl: './detalhe-produto.component.css'
})
export class DetalheProdutoComponent implements OnInit {

  produto: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.productService.getProductById(id).subscribe(data => {
          this.produto = data;
        });
      }
    });
  }
}