import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserOrderDetailsPageRoutingModule } from './user-order-details-routing.module';

import { UserOrderDetailsPage } from './user-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserOrderDetailsPageRoutingModule
  ],
  declarations: [UserOrderDetailsPage]
})
export class UserOrderDetailsPageModule {}
