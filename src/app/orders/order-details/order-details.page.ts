import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  order: Order;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private ordersService: OrderService,
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
}
