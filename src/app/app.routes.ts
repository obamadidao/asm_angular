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
  { path: 'categories/:id/edit', component: CategoryEdit },

  // Brands
  { path: 'brands', component: BrandList },
  { path: 'brands/create', component: BrandCreate },
  { path: 'brands/:id/edit', component: BrandEdit },

  // Fallback route (optional)
  { path: '**', redirectTo: '' }
];
