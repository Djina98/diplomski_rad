import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProducersPageRoutingModule } from './all-producers-routing.module';

import { AllProducersPage } from './all-producers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProducersPageRoutingModule
  ],
  declarations: [AllProducersPage]
})
export class AllProducersPageModule {}
