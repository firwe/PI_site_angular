import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  newProduct: Product = {
    id: '',
    nome: '',
    preco: '',
    categoria: 'whey-protein',
    descricao: '',
    imagem: '',
    precoAntigo: '',
    section: 'lancamentos'
  };

  isEditMode: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      
      this.productService.getProductById(id).subscribe(data => {
        this.newProduct = data;
      });
    }
  }

  onSubmit(): void {
    if (!this.newProduct.id || !this.newProduct.nome || !this.newProduct.preco) {
      alert('Por favor, preencha pelo menos ID, Nome e Preço.');
      return;
    }

    if (this.isEditMode) {
      this.productService.updateProduct(this.newProduct).subscribe(() => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/admin/list']);
      });

    } else {
      this.productService.addProduct({ ...this.newProduct }).subscribe(() => {
        alert('Produto adicionado com sucesso!');
        this.router.navigate(['/admin/list']);
      });
    }
  }
}