/* eslint-disable no-trailing-spaces */
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
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
  @Input() productId: string;
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
          productId: this.location.value.productId,
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
