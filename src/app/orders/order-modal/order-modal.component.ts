/* eslint-disable no-trailing-spaces */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { CartItem } from 'src/app/products/cart/cartItem.model';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  @Input() title: string;
  @Input() products: CartItem[];
  @Input() fullname: string;
  @Input() email: string = this.authService.currentUser.email;
  @Input() phoneNumber: string;
  @Input() city: string;
  @Input() street: string;
  @Input() streetNumber: number;
  @Input() status: string;
  @ViewChild('order', { static: true }) order: NgForm;

  constructor(private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onOrder(){
    if (!this.order.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        orderData: {
          products: this.products,
          fullname: this.order.value.fullname,
          email: this.order.value.email,
          phoneNumber: this.order.value.phoneNumber,
          city: this.order.value.city,
          street: this.order.value.street,
          streetNumber: this.order.value.streetNumber,
          status: this.order.value.status
        }
      },
      'confirm'
    );
  }

}
