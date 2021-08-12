import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProducersPageRoutingModule } from './all-producers-routing.module';

import { AllProducersPage } from './all-producers.page';
import { ProducerItemComponent } from '../producer-item/producer-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProducersPageRoutingModule
  ],
  declarations: [AllProducersPage, ProducerItemComponent]
})
export class AllProducersPageModule {}
