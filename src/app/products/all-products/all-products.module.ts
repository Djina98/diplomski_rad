import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProductsPageRoutingModule } from './all-products-routing.module';

import { AllProductsPage } from './all-products.page';
import { ProductItemComponent } from '../product-item/product-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProductsPageRoutingModule
  ],
  declarations: [AllProductsPage, ProductItemComponent]
})
export class AllProductsPageModule {}
