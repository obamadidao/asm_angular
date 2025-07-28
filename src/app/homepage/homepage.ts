import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service'; 
import { CategoryService } from '../service';
import { BrandService } from '../service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent implements OnInit {
  productCount = 0;
  categoryCount = 0;
  brandCount = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.productCount = products.length;
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryCount = categories.length;
    });

    this.brandService.getAllBrands().subscribe((brands) => {
      this.brandCount = brands.length;
    });
  }
}
