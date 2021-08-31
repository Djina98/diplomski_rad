/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-trailing-spaces */
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;

  constructor(public authService: AuthService, private alertCtrl: AlertController,
              private productsService: ProductsService, private loadingCtrl: LoadingController,
              private navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {}

  onDeleteProduct(product: Product){
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

            this.productsService.deleteProduct(product.id).subscribe(() => {
              this.navCtrl.navigateBack('/products/tabs/all-products');
            });
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
