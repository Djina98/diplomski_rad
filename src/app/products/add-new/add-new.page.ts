/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { HoneyTypes, Packaging } from '../product.model';
import { Producer } from "../../producers/producer.model";
import { ProducersService } from 'src/app/producers/producers.service';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit, OnDestroy {

  honeyTypes = HoneyTypes;
  packaging = Packaging;
  typesKeys = [];
  packagingKeys = [];
  producers: Producer[];
  producersSub: Subscription;

  validationUserMessage = {
    name: [
      {type: 'required', message:'Unesite naziv proizvoda'},
    ],
    description: [
      {type: 'required', message:'Unesite kratak opis proizvoda'},
    ],
    type: [
      {type: 'required', message:'Izaberite vrstu meda'},
    ],
    amount: [
      {type: 'required', message:'Unesite količinu u gramima'},
    ],
    price: [
      {type: 'required', message:'Unesite cenu za datu količinu'},
    ],
    yearOfProduction: [
      {type: 'required', message:'Unesite godinu proizvodnje'},
    ],
    packaging: [
      {type: 'required', message:'Izaberite tip ambalaže'},
    ],
    producer: [
      {type: 'required', message:'Izaberite proizvođača'},
    ],
    imageUrl: [
      {type: 'required', message:'Unesite URL adresu slike proizvoda'},
    ]
  };

  addProduct: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService,
              private loadingCtl: LoadingController,
              private router: Router,
              private producersService: ProducersService,
              private productsService: ProductsService) {
                this.typesKeys=Object.keys(this.honeyTypes);
                this.packagingKeys=Object.keys(this.packaging);
              }


  ngOnInit() {
    this.producersSub = this.producersService.producers.subscribe(producers => {
      console.log(producers);
      this.producers = producers;
    });

    this.addProduct = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      type: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      packaging: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      producer: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      yearOfProduction: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      imageUrl: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  onAddProduct() {
    this.productsService.addProduct(this.addProduct.value.name, this.addProduct.value.type,
    this.addProduct.value.description, this.addProduct.value.amount,
    this.addProduct.value.price, this.addProduct.value.yearOfProduction,
    this.addProduct.value.packaging, this.addProduct.value.producer, this.addProduct.value.imageUrl).subscribe(products => {
      console.log(products);
    });

    this.router.navigateByUrl('/products/tabs/all-products');
    this.addProduct.reset();
  }

  ionViewWillEnter() {
    this.producersService.getProducers().subscribe(producers => {
    });
  }

  ngOnDestroy() {
    if (this.producersSub) {
      this.producersSub.unsubscribe();
    }
  }

}
