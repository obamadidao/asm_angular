import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { CategoryList } from './category-list/category-list';
import { ProductCreate } from './product-create/product-create';
import { CategoryCreate } from './category-create/category-create';
import { ProductEdit } from './product-edit/product-edit'; 

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'products', component: ProductList },
  { path: 'products/create', component: ProductCreate },
  { path: 'products/:id/detail', component: ProductDetail },
  { path: 'products/:id/edit', component: ProductEdit }, 
  { path: 'categories', component: CategoryList },
  { path: 'categories/create', component: CategoryCreate },
];
