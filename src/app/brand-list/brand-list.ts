import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrandService, Brand } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.html',
  styleUrls: ['./brand-list.css'],
})
export class BrandList implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (data) => (this.brands = data),
      error: (err) => console.error('Lỗi tải danh mục:', err),
    });
  }

  // Sửa id sang string
  onDelete(id: string): void {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          alert('Xóa danh mục thành công');
          this.loadBrands(); // reload danh sách
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          alert('Xóa thất bại');
        },
      });
    }
  }

  // Sửa id sang string
  onEdit(id: string): void {
   this.router.navigate(['/brands', id, 'edit']);
  }
}
