// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { ProductCreate } from './product-create/product-create';
import { ProductEdit } from './product-edit/product-edit';

import { CategoryList } from './category-list/category-list';
import { CategoryCreate } from './category-create/category-create';
import { CategoryEdit } from './category-edit/category-edit';

import { BrandList } from './brand-list/brand-list';
import { BrandCreate } from './brand-create/brand-create';
import { BrandEdit } from './brand-edit/brand-edit';

import { LoginComponent } from './auth/login/login'; // điều chỉnh tên/đường dẫn nếu khác
import { RegisterComponent } from './auth/register/register'; // hoặc signup
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // public (login / register)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // protected: phải login mới vào được
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },

  // Products
  { path: 'products', component: ProductList, canActivate: [AuthGuard] },
  { path: 'products/create', component: ProductCreate, canActivate: [AuthGuard] },
  { path: 'products/:id/detail', component: ProductDetail, canActivate: [AuthGuard] },
  { path: 'products/:id/edit', component: ProductEdit, canActivate: [AuthGuard] },

  // Categories
  { path: 'categories', component: CategoryList, canActivate: [AuthGuard] },
  { path: 'categories/create', component: CategoryCreate, canActivate: [AuthGuard] },
  { path: 'categories/:id/edit', component: CategoryEdit, canActivate: [AuthGuard] },

  // Brands
  { path: 'brands', component: BrandList, canActivate: [AuthGuard] },
  { path: 'brands/create', component: BrandCreate, canActivate: [AuthGuard] },
  { path: 'brands/:id/edit', component: BrandEdit, canActivate: [AuthGuard] },

  // fallback: nếu không login sẽ bị redirect về login vì guard trên '' route
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
