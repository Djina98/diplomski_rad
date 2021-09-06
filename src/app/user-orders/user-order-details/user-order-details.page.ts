import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Order } from 'src/app/orders/order.model';
import { OrderService } from 'src/app/orders/order.service';
import { CartItem } from 'src/app/products/cart/cartItem.model';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.page.html',
  styleUrls: ['./user-order-details.page.scss'],
})
export class UserOrderDetailsPage implements OnInit {

  order: Order;
  isLoading = false;
  cartItems: CartItem[];
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private ordersService: OrderService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {

      if (!paramMap.has('orderId')) {
        this.navCtrl.navigateBack('orders/my-orders');
        return;
      }

      this.isLoading = true;

      this.ordersService
        .getUserOrder(paramMap.get('orderId'))
        .subscribe((order) => {
          this.order = order;
          this.isLoading = false;
        });

    });
  }

}
