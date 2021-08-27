/* eslint-disable no-trailing-spaces */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit {
  @Input() title: string;
  @Input() product: Product;
  @Input() longitude: string;
  @Input() latitude: string;
  @Input() dateFrom: Date;
  @Input() dateTo: Date;
  @ViewChild('location', { static: true }) location: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddLocation(){
    if (!this.location.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        locationData: {
          productId: this.product.id,
          latitude: this.location.value.latitude,
          longitude: this.location.value.longitude,
          dateFrom: this.location.value.dateFrom,
          dateTo: this.location.value.dateTo,
        }
      },
      'confirm'
    );
  }

}
