import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { ProductModalComponent } from '../../product-modal/product-modal.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule
  ],
  declarations: [ProductDetailsPage, ProductModalComponent, LocationModalComponent, ProductDescriptionComponent],
  entryComponents: [ProductModalComponent, LocationModalComponent]
})
export class ProductDetailsPageModule {}
