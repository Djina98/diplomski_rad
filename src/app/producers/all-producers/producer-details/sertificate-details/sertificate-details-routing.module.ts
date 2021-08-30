import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SertificateDetailsPage } from './sertificate-details.page';

const routes: Routes = [
  {
    path: '',
    component: SertificateDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SertificateDetailsPageRoutingModule {}
