import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducerDetailsPage } from './producer-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProducerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProducerDetailsPageRoutingModule {}
