import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [

  {
    path: 'tabs',
    component: ProductsPage,
    children: [
      {
        path: 'all-products',
        loadChildren: () => import('./all-products/all-products.module').then( m => m.AllProductsPageModule)
      },
      {
        path: 'add-new',
        loadChildren: () => import('./add-new/add-new.module').then( m => m.AddNewPageModule)
      },
      {
        path: '',
        redirectTo: '/products/tabs/all-products',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/products/tabs/all-products',
    pathMatch: 'full'
  },
  /*
  {
    path: '',
    component: ProductsPage
  },
  {
    //path: 'product-details',
    path: ':productId',
    loadChildren: () => import('./all-products/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'all-products',
    loadChildren: () => import('./all-products/all-products.module').then( m => m.AllProductsPageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./add-new/add-new.module').then( m => m.AddNewPageModule)
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
