import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Order } from '../orders/order.model';
import { OrderService } from '../orders/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage implements OnInit, OnDestroy {

  orders: Order[];
  private sub: Subscription;

  constructor(private ordersService: OrderService, public authService: AuthService) { }

  ngOnInit() {
    this.sub = this.ordersService.userOrders.subscribe(orders => {
      this.orders = orders;
    });
  }

  ionViewWillEnter() {
    this.ordersService.getUserOrders().subscribe(orders => {
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
