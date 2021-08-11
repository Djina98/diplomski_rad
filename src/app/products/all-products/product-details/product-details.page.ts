/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ProductModalComponent } from '../../product-modal/product-modal.component';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: Product;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
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
    console.log(this.product);
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
            name: this.product.name, type: this.product.type,
            description: this.product.description, amount: this.product.amount,
            price: this.product.price, yearOfProduction: this.product.yearOfProduction,
            packaging: this.product.packaging, imageUrl: this.product.imageUrl},
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
                  this.product.imageUrl = resultData.data.productData.imageUrl;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
}
