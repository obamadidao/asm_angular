  import { Routes } from '@angular/router';
  import { ProductList } from './product-list/product-list';
  import { ProductDetail } from './product-detail/product-detail';
  import { CategoryList } from './category-list/category-list';
  import { ProductCreate } from './product-create/product-create';
  import { BrandCreate } from './brand-create/brand-create';
  import { CategoryCreate } from './category-create/category-create';

  export const routes: Routes = [
    {
      path: '',
      component: ProductList,
    },
    {
      path: 'products',
      component: ProductList,
    },
    {
      path: 'categories',
      component: CategoryList,
    },
    //   {
    //   path: 'brands',
    //   component: BrandList,
    // },
    //   {
    //   path: 'users',
    //   component: UserList,
    // },
    {
      path: 'product/:id/detail',
      component: ProductDetail,
      canActivate: [], // Add guards if needed
    },
    {
      path: 'products/create',
      component: ProductCreate,
    },
    {
      path: 'brands/create',
      component: BrandCreate,
    },
    {
      path: 'categories/create',
      component: CategoryCreate,
    },
  ];
