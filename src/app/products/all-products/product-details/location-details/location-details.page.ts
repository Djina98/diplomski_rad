/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { Location } from '../location.model';
import { LocationsService } from '../locations.service';
import { MapModalComponent } from '../map-modal/map-modal.component';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: ['./location-details.page.scss'],
})
export class LocationDetailsPage implements OnInit {
  location: Location;
  product: Product;
  isLoading = false;

/*
  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom : 14,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  }

  marker = {
      position: { lat: 38.9987208, lng: -77.2538699 },
  }
*/
  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private productsService: ProductsService,
    public authService: AuthService
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
        });

      if (!paramMap.has('locationId')) {
        this.navCtrl.navigateBack(`/products/tabs/all-products/${this.product.id}`);
        return;
      }

      this.locationsService
        .getLocation(paramMap.get('locationId'))
        .subscribe((location) => {
          this.location = location;
          this.isLoading = false;
        });
    });
  }

  onDeleteLocation(){
    this.alertCtrl.create({
      header: 'Brisanje lokacije ko??nica',
      message: 'Da li ste sigurni da ??elite da obri??ete ovu lokaciju?',
      buttons:
      [{
          text: 'Odustani',
          role: 'cancel'
        }, {
          text: 'Obri??i',
          handler: () => {

            this.locationsService.deleteLocation(this.location.id).subscribe(() => {
              this.navCtrl.navigateBack(`/products/tabs/all-products/${this.product.id}`);
            });
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onEditLocation() {
    this.modalCtrl
      .create({
        component: LocationModalComponent,
        componentProps: {
            title: 'Izmena lokacije ko??nica',
            productId: this.location.productId, latitude: this.location.latitude,
            longitude: this.location.longitude, dateFrom: this.location.dateFrom,
            dateTo: this.location.dateTo},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: '??uvanje...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.locationsService
                .editLocation(
                  this.location.id,
                  resultData.data.locationData.productId,
                  resultData.data.locationData.latitude,
                  resultData.data.locationData.longitude,
                  resultData.data.locationData.dateFrom,
                  resultData.data.locationData.dateTo,
                )
                .subscribe((locations) => {
                  this.location.productId = resultData.data.locationData.productId;
                  this.location.latitude = resultData.data.locationData.latitude;
                  this.location.longitude = resultData.data.locationData.longitude;
                  this.location.dateFrom = resultData.data.locationData.dateFrom;
                  this.location.dateTo = resultData.data.locationData.dateTo;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

  onOpenMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
            title: 'Prikaz na mapi',
            latitude: this.location.latitude,
            longitude: this.location.longitude
          },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      });
  }

}
