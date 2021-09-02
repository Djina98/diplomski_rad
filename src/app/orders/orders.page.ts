import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  orders: Order[];
  private sub: Subscription;

  constructor(private ordersService: OrderService, public authService: AuthService) { }

  ngOnInit() {
    this.sub = this.ordersService.orders.subscribe(orders => {
      this.orders = orders;
    });
  }

  ionViewWillEnter() {
    this.ordersService.getOrders().subscribe(orders => {
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
