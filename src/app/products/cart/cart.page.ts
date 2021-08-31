/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterUser } from 'src/app/auth/registerUser.model';
import { OrderModalComponent } from 'src/app/orders/order-modal/order-modal.component';
import { OrderService } from 'src/app/orders/order.service';
import { Product } from '../product.model';
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
  private sub: Subscription;

  constructor(private cartsService: CartService,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private ordersService: OrderService,
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onRemoveProduct(cartItem: CartItem){
    this.cartsService.remove(cartItem.id).subscribe(() => {

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
      console.log(resultData);

      this.ordersService.order(resultData.data.orderData.products, resultData.data.orderData.fullname, resultData.data.orderData.email, resultData.data.orderData.phoneNumber, resultData.data.orderData.city, resultData.data.orderData.street, resultData.data.orderData.streetNumber, resultData.data.orderData.status).subscribe((orders) => {
        this.toastMessage('Vaša porudžbina je uspešno evidentirana. Čeka se odobrenje od admin tima.');
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
