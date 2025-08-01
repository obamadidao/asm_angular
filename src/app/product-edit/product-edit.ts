import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ProductService,
  Product,
  CategoryService,
  Category,
  BrandService,
  Brand,
} from '../service';
import { HttpClientModule } from '@angular/common/http';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css'],
})
export class ProductEdit implements OnInit {
  product: Product | null = null;
  isLoading = true;
  categories: Category[] = [];
  brands: Brand[] = [];

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
    types: [
      {
        type: 'warning',
        background: '#f59e0b',
        icon: false,
      },
    ],
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = { ...data };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy sản phẩm:', err);
          this.isLoading = false;
          this.notyf.error('Không tải được sản phẩm.');
        },
      });
    } else {
      this.isLoading = false;
      this.notyf.open({ type: 'warning', message: 'ID sản phẩm không hợp lệ.' });
    }

    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
        this.notyf.error('Không tải được danh mục.');
      },
    });

    this.brandService.getAllBrands().subscribe({
      next: (data) => (this.brands = data),
      error: (err) => {
        console.error('Lỗi khi lấy thương hiệu:', err);
        this.notyf.error('Không tải được thương hiệu.');
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file && this.product) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product!.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(form: NgForm): void {
    if (!this.product) {
      this.notyf.error('Không có sản phẩm để cập nhật.');
      return;
    }

    // Validation cơ bản
    const isValidName = this.product.name.trim() !== '';
    const priceNum = Number(this.product.price);
    const isValidPrice = !isNaN(priceNum) && priceNum >= 0;
    const isValidCategory = this.product.categoryId !== '' && this.product.categoryId !== null;
    const isValidBrand = this.product.brandId !== '' && this.product.brandId !== null;
    const isValidImage = this.product.image.trim() !== '';

    if (!(form.valid && isValidName && isValidPrice && isValidCategory && isValidBrand && isValidImage)) {
      const missing: string[] = [];
      if (!isValidName) missing.push('tên');
      if (!isValidPrice) missing.push('giá hợp lệ');
      if (!isValidCategory) missing.push('danh mục');
      if (!isValidBrand) missing.push('thương hiệu');
      if (!isValidImage) missing.push('ảnh');
      const msg =
        missing.length > 0
          ? `Thiếu hoặc không hợp lệ: ${missing.join(', ')}.`
          : 'Vui lòng điền đầy đủ và chính xác thông tin.';
      this.notyf.open({ type: 'warning', message: msg });
      return;
    }

    // chuẩn hóa
    this.product.price = priceNum;

    this.productService.updateProduct(this.product.id.toString(), this.product).subscribe({
      next: () => {
        this.notyf.success('Cập nhật sản phẩm thành công!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        this.notyf.error('Cập nhật thất bại.');
      },
    });
  }
}
