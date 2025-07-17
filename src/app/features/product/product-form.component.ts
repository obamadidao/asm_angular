import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],  
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id: number | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  ngOnInit(): void {
    // ✅ Thêm cả field 'image'
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.id = +idParam;
        this.productService.getById(this.id).subscribe(product => {
          this.form.patchValue(product);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formData = this.form.value as Product;

    if (this.isEdit && this.id !== null) {
      this.productService.update(this.id, formData).subscribe(() => {
        alert('Cập nhật thành công');
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(formData).subscribe(() => {
        alert('Thêm mới thành công');
        this.router.navigate(['/products']);
      });
    }
  }
}
