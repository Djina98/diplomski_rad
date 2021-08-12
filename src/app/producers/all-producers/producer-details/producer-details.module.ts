import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProducerDetailsPageRoutingModule } from './producer-details-routing.module';

import { ProducerDetailsPage } from './producer-details.page';
import { ProducerModalComponent } from '../../producer-modal/producer-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProducerDetailsPageRoutingModule
  ],
  declarations: [ProducerDetailsPage, ProducerModalComponent],
  entryComponents: [ProducerModalComponent]
})
export class ProducerDetailsPageModule {}