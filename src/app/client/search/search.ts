import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.html',
})
export class SearchComponent {
  keyword: string = '';
  results: Product[] = [];

  constructor(private productService: ProductService) {}

  onSearch() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.results = data.filter(product =>
        product.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    });
  }
}
