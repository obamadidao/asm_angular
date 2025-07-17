import { Routes } from '@angular/router';
import { productRoutes } from './features/product/product.routes';
// import thêm các routes khác nếu có: brandRoutes, userRoutes, categoryRoutes

export const routes: Routes = [
  {
    path: 'products',
    children: productRoutes
  },
  // {
  //   path: 'brands',
  //   children: brandRoutes
  // },
  // ...
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
