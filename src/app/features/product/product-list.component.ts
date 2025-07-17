import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DecimalPipe } from '@angular/common'; 

import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [CommonModule], 
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  goToAdd() {
    this.router.navigate(['/products/add']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }
}
