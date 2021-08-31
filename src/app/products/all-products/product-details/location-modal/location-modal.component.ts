/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) { }

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

  customOptions = {
    buttons: [{
      text: 'Nazad',
      role:'cancel',
    }, {
      text: 'Izbriši',
      handler: () => this.location.controls['dateTo'].setValue(null)
    }, {
      text: 'Izaberi',
      handler: (data) => {
        console.log('Data', data);
        let year: string = data.year.text;
        let month: string = data.month.value < 10 ? '0' + data.month.value.toString(): data.month.value.toString();
        this.location.controls['dateTo'].setValue(year + '-' + month)
      }
    }]
  }

}
