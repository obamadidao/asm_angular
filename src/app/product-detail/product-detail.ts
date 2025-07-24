import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = {
    id: 1,
    name: 'Laptop',
    price: 1000,
    image:
      'https://fdn.gsmarena.com/imgroot/reviews/24/apple-iphone-16/lifestyle/-1024w2/gsmarena_001.jpg',
    inStock: true,
  };

  productId: string | null = null;

  constructor(private route: ActivatedRoute) {}
  // useEffect
  ngOnInit() {
    // subscribe = then /catch
    // this.route.paramMap.subscribe((params) => {
    //   this.productId = params.get('id');
    // });
    this.productId = this.route.snapshot.paramMap.get('id');
    // snapshot
  }
}
