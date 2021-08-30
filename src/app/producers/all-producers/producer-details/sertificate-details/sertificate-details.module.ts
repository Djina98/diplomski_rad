import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SertificateDetailsPageRoutingModule } from './sertificate-details-routing.module';

import { SertificateDetailsPage } from './sertificate-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SertificateDetailsPageRoutingModule
  ],
  declarations: [SertificateDetailsPage]
})
export class SertificateDetailsPageModule {}
