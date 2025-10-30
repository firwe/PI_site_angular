import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getLancamentos().subscribe(data => {
      this.lancamentos = data;
    });
    
    this.productService.getMaisVendidos().subscribe(data => {
      this.maisVendidos = data;
    });
  }

}