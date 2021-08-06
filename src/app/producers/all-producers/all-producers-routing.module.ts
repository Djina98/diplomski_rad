import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProducersPage } from './all-producers.page';

const routes: Routes = [
  {
    path: '',
    component: AllProducersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProducersPageRoutingModule {}
