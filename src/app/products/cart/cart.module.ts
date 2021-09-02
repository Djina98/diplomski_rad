import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { OrderModalComponent } from 'src/app/orders/order-modal/order-modal.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage, OrderModalComponent, CartModalComponent],
  entryComponents: [OrderModalComponent, CartModalComponent]
})
export class CartPageModule {}
