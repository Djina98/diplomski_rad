import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from 'src/app/products/products.service';
import { ProducersService } from '../producers.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {

  validationUserMessage = {
    name: [
      {type: 'required', message:'Unesite naziv proizvođača'},
    ],
    description: [
      {type: 'required', message:'Unesite kratak opis'},
    ],
    address: [
      {type: 'required', message:'Unesite adresu na kojoj se nalazi proizvođač'},
    ],
    phoneNumber: [
      {type: 'required', message:'Unesite kontakt telefon'},
    ],
    taxIdentificationNumber: [
      {type: 'required', message:'Unesite PIB broj kompanije'},
    ],
    companyNumber: [
      {type: 'required', message:'Unesite matični broj kompanije'},
    ],
    imageUrl: [
      {type: 'required', message:'Unesite URL adresu slike proizvođača'},
    ],
    website: [
      {type: 'required', message:'Unesite URL adresu sajta proizvođača'},
    ]
  };

  addProducer: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService,
              private loadingCtl: LoadingController,
              private router: Router,
              private producersService: ProducersService,
              private productsService: ProductsService) { }


  ngOnInit() {
    this.addProducer = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      taxIdentificationNumber: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      companyNumber: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      imageUrl: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      website: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  onAddProducer() {
    this.producersService.addProducer(this.addProducer.value.name, this.addProducer.value.description,
    this.addProducer.value.address, this.addProducer.value.phoneNumber,
    this.addProducer.value.taxIdentificationNumber, this.addProducer.value.companyNumber,
    this.addProducer.value.website, this.addProducer.value.imageUrl).subscribe(producers => {
      console.log(producers);
    });

    this.router.navigateByUrl('/producers/tabs/all-producers');
    this.addProducer.reset();
  }

}
