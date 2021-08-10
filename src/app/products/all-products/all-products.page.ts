import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit, OnDestroy {

  products: Product[];
  private productsSub: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsSub = this.productsService.products.subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  ionViewWillEnter() {
    this.productsService.getProducts().subscribe(performances => {
    });
  }

  ngOnDestroy() {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }


}
