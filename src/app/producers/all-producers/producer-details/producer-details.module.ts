import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProducerDetailsPageRoutingModule } from './producer-details-routing.module';

import { ProducerDetailsPage } from './producer-details.page';
import { ProducerModalComponent } from '../../producer-modal/producer-modal.component';
import { SertificateModalComponent } from './sertificate-modal/sertificate-modal.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProducerDetailsPageRoutingModule
  ],
  declarations: [ProducerDetailsPage, ProducerModalComponent, SertificateModalComponent, DescriptionComponent],
  entryComponents: [ProducerModalComponent, SertificateModalComponent]
})
export class ProducerDetailsPageModule {}
