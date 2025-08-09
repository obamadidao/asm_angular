import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../service';
import { CategoryService, Category } from '../service';
import { BrandService, Brand } from '../service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  productCount = 0;
  categoryCount = 0;
  brandCount = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.productCount = products.length;
    });

    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categoryCount = categories.length;
    });

    this.brandService.getAllBrands().subscribe((brands: Brand[]) => {
      this.brandCount = brands.length;
    });
  }
}
