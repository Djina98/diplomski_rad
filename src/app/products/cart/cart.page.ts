/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterUser } from 'src/app/auth/registerUser.model';
import { OrderModalComponent } from 'src/app/orders/order-modal/order-modal.component';
import { OrderService } from 'src/app/orders/order.service';
import { Product } from '../product.model';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CartService } from './cart.service';
import { CartItem } from './cartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  cartItems: CartItem[];
  product: Product;
  user: RegisterUser;
  totalPrice: number = 0;
  private sub: Subscription;

  constructor(private cartsService: CartService,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private ordersService: OrderService,
              private loadingCtrl: LoadingController,
              private router: Router,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController
              ) {
                this.user = authService.currentUser;
              }

  ngOnInit() {
    this.sub = this.cartsService.cartItems.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  ionViewWillEnter() {
    this.cartsService.getCartItems(this.user.email).subscribe(cartsItems => {
    });

  }

  ionViewDidEnter(){
    this.toastMessage('Prevucite proizvod ulevo za dodatne funkcionalnosti');
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onRemoveProduct(cartItem: CartItem){
    this.alertCtrl.create({
      header: 'Brisanje proizvoda',
      message: 'Da li ste sigurni da želite da uklonite ovaj proizvod iz korpe?',
      buttons:
      [{
          text: 'Odustani',
          role: 'cancel'
        }, {
          text: 'Ukloni',
          handler: () => {
            this.cartsService.remove(cartItem.id).subscribe(() => {

            });
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onOrder(){
    this.modalCtrl
    .create({
      component: OrderModalComponent,
      componentProps: {title: 'Narudžbina', products: this.cartItems}
    })
    .then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
    if (resultData.role === 'confirm') {
      for(let cartItem of this.cartItems){
        this.totalPrice = this.totalPrice + cartItem.price;
      }
      this.cartsService.emptyCart(this.user.email).subscribe((cartItems)=> {
        this.cartItems = cartItems;
        this.totalPrice = 0;
      });
      this.ordersService.order(resultData.data.orderData.products, this.totalPrice, resultData.data.orderData.fullname, resultData.data.orderData.email, resultData.data.orderData.phoneNumber, resultData.data.orderData.city, resultData.data.orderData.street, resultData.data.orderData.streetNumber, resultData.data.orderData.status).subscribe((orders) => {
        this.router.navigateByUrl('/user-orders');
      });
    }
  });
  }

  onEditProduct(cartItem: CartItem){
    this.modalCtrl
      .create({
        component: CartModalComponent,
        componentProps: {
          title: 'Izmena količine',
          product: cartItem.product,
          amount: cartItem.amount,
          userEmail: cartItem.userEmail
        },
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
                this.cartsService
                  .editCartItem(
                    cartItem.id,
                    resultData.data.cartItemData.product,
                    resultData.data.cartItemData.amount,
                    resultData.data.cartItemData.userEmail,
                  )
                  .subscribe((cartItems) => {
                    loadingEl.dismiss();
                  });
              });
          }
        });
  }

  async toastMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'top',
      cssClass: 'toastAfterHeader'
    });
    toast.present();
  }
}
