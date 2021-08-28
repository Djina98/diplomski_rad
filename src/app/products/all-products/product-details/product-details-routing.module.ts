import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsPage } from './product-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
  },
  {
    path: ':locationId',
    loadChildren: () => import('./location-details/location-details.module').then( m => m.LocationDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsPageRoutingModule {}
