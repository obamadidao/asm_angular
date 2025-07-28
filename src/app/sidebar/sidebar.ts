import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common'; // 👈 Thêm dòng này

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf], // 👈 Thêm NgIf
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  showProducts = false;
  showCategories = false;
  showBrands = false; // 👈 Thêm biến này

  toggleProducts() {
    this.showProducts = !this.showProducts;
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  toggleBrands() {
    this.showBrands = !this.showBrands; // 👈 Thêm hàm này
  }
}

