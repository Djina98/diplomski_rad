import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from '../../product.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  @Input() title: string;
  @Input() product: Product;
  @Input() amount: number;
  @Input() userEmail: string;
  @ViewChild('cartItem', { static: true }) cartItem: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onEdit(){
    if (!this.cartItem.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        cartItemData: {
          product: this.product,
          amount: this.cartItem.value.amount,
          userEmail: this.cartItem.value.userEmail,
        }
      },
      'confirm'
    );
  }

}
