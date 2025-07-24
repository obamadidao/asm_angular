import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  product = {
    title: '',
    image: '',
    price: 0,
    inStock: true,
  };

  handleSubmit(productForm: NgForm) {
    console.log('productForm', productForm);
    if (!productForm.invalid) {
      // submit
    }
    // console.log('product', this.product);
  }
  // FormsModule validate: HTML + Angualr: invalid +touched + title.errors?.['required'] => show error

  // search
  // sub email

  // Validate phuc tap: ReactiveForm
}
