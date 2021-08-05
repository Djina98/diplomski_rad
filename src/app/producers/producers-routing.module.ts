import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducersPage } from './producers.page';

const routes: Routes = [
  {
    path: '',
    component: ProducersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProducersPageRoutingModule {}
