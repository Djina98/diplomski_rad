/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Product } from 'src/app/products/product.model';
import { CartItem } from 'src/app/products/cart/cartItem.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  order: Order;
  isLoading = false;
  cartItems: CartItem[];
  totalPrice: number = 0;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private ordersService: OrderService,
    //public emailComposer: EmailComposer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {

      if (!paramMap.has('orderId')) {
        this.navCtrl.navigateBack('orders');
        return;
      }

      this.isLoading = true;

      this.ordersService
        .getOrder(paramMap.get('orderId'))
        .subscribe((order) => {
          this.order = order;
          this.isLoading = false;
        });

    });
  }

  acceptOrder(){
    this.totalPrice = this.order.totalPrice + 300;
    let email= {
      to: this.order.email,
      cc: [],
      bcc: [],
      attachment: [],
      subject: 'Bee Organic - Vaša narudžbina je prihvaćena',
      body: `Poštovani,
             Ovim putem Vas obaveštavamo da je Vaša narudžbina odobrena. Vreme isporuke je 3 do 5 dana
             brzom poštom PostExpress. Ukupna cena sa troškovima isporuke je ${this.totalPrice}.
             Hvala Vam što kupujete kod nas.

             Organic Bee Tim`,
      isHtml: false,
      app: 'Gmail'
    }
    //this.emailComposer.open(email);
    this.changeOrderStatus('Odobreno');
  }

  declineOrder(){
    this.totalPrice = this.order.totalPrice + 300;
    let email= {
      to: this.order.email,
      cc: [],
      bcc: [],
      attachment: [],
      subject: 'Bee Organic - Vaša narudžbina je odbijena',
      body: `Poštovani,
             Ovim putem Vas obaveštavamo da je Vaša narudžbina odbijena. Za više informacija
             možete kontaktirati admin tim putem mejla admin@admin.com ili
             na broj 0601234567.
             Hvala Vam što kupujete kod nas.

             Organic Bee Tim`,
      isHtml: false,
      app: 'Gmail'
    }
    //this.emailComposer.open(email);
    this.changeOrderStatus('Odbijeno');
  }

  changeOrderStatus(status: string){
    this.ordersService
        .editOrder(
          this.order.id,
          this.order.products,
          this.order.totalPrice,
          this.order.fullname,
          this.order.email,
          this.order.phoneNumber,
          this.order.city,
          this.order.street,
          this.order.streetNumber,
          status
        )
        .subscribe((orders) => {
          this.order.status = status;
        });
  }
}
