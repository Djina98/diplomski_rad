import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProductsPage } from './all-products.page';

const routes: Routes = [
  {
    path: '',
    component: AllProductsPage
  },
  {
    path: ':productId',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProductsPageRoutingModule {}
