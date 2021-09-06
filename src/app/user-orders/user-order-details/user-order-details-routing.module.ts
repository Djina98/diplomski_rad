import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserOrderDetailsPage } from './user-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: UserOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserOrderDetailsPageRoutingModule {}
