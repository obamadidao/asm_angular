import { Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { ProductCreate } from './product-create/product-create';
import { ProductEdit } from './product-edit/product-edit';

import { CategoryList } from './category-list/category-list';
import { CategoryCreate } from './category-create/category-create';

import { BrandList } from './brand-list/brand-list';
import { BrandCreate } from './brand-create/brand-create';

export const routes: Routes = [
  { path: '', component: HomepageComponent },

  // Products
  { path: 'products', component: ProductList },
  { path: 'products/create', component: ProductCreate },
  { path: 'products/:id/detail', component: ProductDetail },
  { path: 'products/:id/edit', component: ProductEdit },

  // Categories
  { path: 'categories', component: CategoryList },
  { path: 'categories/create', component: CategoryCreate },

  // Brands
  { path: 'brands', component: BrandList },
  { path: 'brands/create', component: BrandCreate },

  // Fallback route (optional)
  { path: '**', redirectTo: '' }
];
