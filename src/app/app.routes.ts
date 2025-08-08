import { Routes } from '@angular/router';

// Admin components
import { HomepageComponent } from './dashboard/dashboard';
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

// Auth
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { AuthGuard } from './auth/auth.guard';

// ✅ Client components - đúng tên file bạn có
import { ClientHomeComponent } from './client/client-home/client-home';
import { ProductDetailComponent } from './client/product-detail/product-detail';
import { SearchComponent } from './client/search/search';

export const routes: Routes = [
  // --- Public pages ---
  { path: '', component: ClientHomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },

  // --- Auth pages ---
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // --- Admin pages (protected by AuthGuard) ---
  { path: 'admin', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'admin/products', component: ProductList, canActivate: [AuthGuard] },
  { path: 'admin/products/create', component: ProductCreate, canActivate: [AuthGuard] },
  { path: 'admin/products/:id/detail', component: ProductDetail, canActivate: [AuthGuard] },
  { path: 'admin/products/:id/edit', component: ProductEdit, canActivate: [AuthGuard] },

  { path: 'admin/categories', component: CategoryList, canActivate: [AuthGuard] },
  { path: 'admin/categories/create', component: CategoryCreate, canActivate: [AuthGuard] },
  { path: 'admin/categories/:id/edit', component: CategoryEdit, canActivate: [AuthGuard] },

  { path: 'admin/brands', component: BrandList, canActivate: [AuthGuard] },
  { path: 'admin/brands/create', component: BrandCreate, canActivate: [AuthGuard] },
  { path: 'admin/brands/:id/edit', component: BrandEdit, canActivate: [AuthGuard] },

  // fallback
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
