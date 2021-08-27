import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterUser } from 'src/app/auth/registerUser.model';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit, OnDestroy {

  products: Product[];
  public role: string;
  private productsSub: Subscription;

  constructor(private productsService: ProductsService, public authService: AuthService) { }

  ngOnInit() {
    this.productsSub = this.productsService.products.subscribe(products => {
      this.products = products;
    });
  }

  ionViewWillEnter() {
    this.productsService.getProducts().subscribe(products => {
    });
  }

  ngOnDestroy() {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }


}
