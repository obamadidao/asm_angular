import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  showProducts = false;
  showCategories = false;
  showBrands = false;

  constructor(public auth: AuthService) {}

  toggleProducts() {
    this.showProducts = !this.showProducts;
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  toggleBrands() {
    this.showBrands = !this.showBrands;
  }
}
