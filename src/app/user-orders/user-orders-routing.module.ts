import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserOrdersPage } from './user-orders.page';

const routes: Routes = [
  {
    path: '',
    component: UserOrdersPage
  },
  {
    path: ':orderId',
    loadChildren: () => import('./user-order-details/user-order-details.module').then( m => m.UserOrderDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserOrdersPageRoutingModule {}
