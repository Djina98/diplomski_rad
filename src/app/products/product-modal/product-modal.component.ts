import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Producer } from 'src/app/producers/producer.model';
import { ProducersService } from 'src/app/producers/producers.service';
import { HoneyTypes, Packaging } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() name: string;
  @Input() type: HoneyTypes;
  @Input() description: string;
  @Input() amount: number;
  @Input() price: number;
  @Input() yearOfProduction: number;
  @Input() packaging: Packaging;
  @Input() imageUrl: string;
  @ViewChild('editProduct', { static: true }) editProduct: NgForm;

  honeyTypes = HoneyTypes;
  packagingType = Packaging;
  producers: Producer[];
  typesKeys = [];
  packagingKeys = [];



  constructor(private modalCtrl: ModalController) {
                this.typesKeys=Object.keys(this.honeyTypes);
                this.packagingKeys=Object.keys(this.packagingType);
              }


  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onEditProduct() {
    if (!this.editProduct.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        productData: {
          name: this.editProduct.value.name,
          type: this.editProduct.value.type,
          description: this.editProduct.value.description,
          amount: this.editProduct.value.amount,
          price: this.editProduct.value.price,
          yearOfProduction: this.editProduct.value.yearOfProduction,
          packaging: this.editProduct.value.packaging,
          imageUrl: this.editProduct.value.imageUrl,
        }
      },
      'confirm'
    );
  }

}
