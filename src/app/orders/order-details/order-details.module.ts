import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderDetailsPageRoutingModule } from './order-details-routing.module';
import { OrderDetailsPage } from './order-details.page';
//import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsPageRoutingModule
  ],
  declarations: [OrderDetailsPage],
  //providers: [EmailComposer]
})
export class OrderDetailsPageModule {}
