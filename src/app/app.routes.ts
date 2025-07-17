import { Routes } from '@angular/router';
import { productRoutes } from './features/product/product.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', children: productRoutes },
  // Bạn có thể thêm brand, user, category ở đây
];
