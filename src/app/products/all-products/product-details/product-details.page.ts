/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductModalComponent } from '../../product-modal/product-modal.component';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { Location } from './location.model';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit, OnDestroy {


  product: Product;
  isLoading = false;
  locations: Location[];
  private locationsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private locationsService: LocationsService,
    private toastCtrl: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('productId')) {
        this.navCtrl.navigateBack('/products/tabs/all-products');
        return;
      }

      this.isLoading = true;

      this.productsService
        .getProduct(paramMap.get('productId'))
        .subscribe((product) => {
          this.product = product;
          this.isLoading = false;
        });
    });

    this.locationsSub = this.locationsService.locations.subscribe(locations => {
      this.locations = locations;
    });
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(paramMap => {
      this.locationsService.getLocations(paramMap.get('productId')).subscribe(locations => {
        console.log(locations);
      });
    });
  }

  ionViewDidEnter(){
    if(this.locations.length===0 && this.authService.currentUser.email==='admin@admin.com'){
      this.toastMessage(`Za ovaj proizvod nisu unete lokacije košnica.`);
    }
  }

  ngOnDestroy() {
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
  }

  onDeleteProduct(){
    this.alertCtrl.create({
      header: 'Brisanje proizvoda',
      message: 'Da li ste sigurni da želite da obrišete ovaj proizvod?',
      buttons:
      [{
          text: 'Odustani',
          role: 'cancel'
        }, {
          text: 'Obriši',
          handler: () => {

            this.productsService.deleteProduct(this.product.id).subscribe(() => {
              this.navCtrl.navigateBack('/products/tabs/all-products');
            });
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onEditProduct() {
    this.modalCtrl
      .create({
        component: ProductModalComponent,
        componentProps: {
            title: 'Izmena proizvoda',
            name: this.product.name, type: this.product.type,
            description: this.product.description, amount: this.product.amount,
            price: this.product.price, yearOfProduction: this.product.yearOfProduction,
            packaging: this.product.packaging, producer: this.product.producer,
            imageUrl: this.product.imageUrl},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Čuvanje...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.productsService
                .editProduct(
                  this.product.id,
                  resultData.data.productData.name,
                  resultData.data.productData.type,
                  resultData.data.productData.description,
                  resultData.data.productData.amount,
                  resultData.data.productData.price,
                  resultData.data.productData.yearOfProduction,
                  resultData.data.productData.packaging,
                  resultData.data.productData.producer,
                  resultData.data.productData.imageUrl,
                )
                .subscribe((products) => {
                  this.product.name = resultData.data.productData.name;
                  this.product.type = resultData.data.productData.type;
                  this.product.description = resultData.data.productData.description;
                  this.product.amount = resultData.data.productData.amount;
                  this.product.price = resultData.data.productData.price;
                  this.product.yearOfProduction = resultData.data.productData.yearOfProduction;
                  this.product.packaging = resultData.data.productData.packaging;
                  this.product.producer = resultData.data.productData.producer;
                  this.product.imageUrl = resultData.data.productData.imageUrl;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

  onAddLocation(){
    this.modalCtrl
      .create({
        component: LocationModalComponent,
        componentProps: {title: 'Lokacija košnica', productId: this.product.id}
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);

        this.locationsService.addLocation(resultData.data.locationData.productId, resultData.data.locationData.latitude, resultData.data.locationData.longitude, resultData.data.locationData.dateFrom, resultData.data.locationData.dateTo).subscribe((locations) => {

        });
      }
    });
  }

  async toastMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
    });
    toast.present();
  }
}
