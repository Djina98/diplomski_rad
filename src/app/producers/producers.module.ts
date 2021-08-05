import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProducersPageRoutingModule } from './producers-routing.module';

import { ProducersPage } from './producers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProducersPageRoutingModule
  ],
  declarations: [ProducersPage]
})
export class ProducersPageModule {}
