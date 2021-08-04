import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  loadedProduct: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('productId')){
        this.router.navigate(['/products']);
        return;
      }

      const productId = paramMap.get('productId');
      this.loadedProduct = this.productsService.getProduct(productId);
    });
  }

  onDeleteProduct(){
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this product?',
      buttons:
      [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this.productsService.deleteProduct(this.loadedProduct.id);
            this.router.navigate(['/products']);
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
