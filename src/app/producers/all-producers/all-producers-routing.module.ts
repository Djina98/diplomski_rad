import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProducersPage } from './all-producers.page';

const routes: Routes = [
  {
    path: '',
    component: AllProducersPage
  },
  {
    path: ':producerId',
    loadChildren: () => import('./producer-details/producer-details.module').then( m => m.ProducerDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProducersPageRoutingModule {}
