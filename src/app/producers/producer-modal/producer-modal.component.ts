import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-producer-modal',
  templateUrl: './producer-modal.component.html',
  styleUrls: ['./producer-modal.component.scss'],
})
export class ProducerModalComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() address: string;
  @Input() phoneNumber: string;
  @Input() taxIdentificationNumber: string;
  @Input() companyNumber: string;
  @Input() website: string;
  @Input() imageUrl: string;
 @ViewChild('editProducer', { static: true }) editProducer: NgForm;

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() {

  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onEditProducer() {
    if (!this.editProducer.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        producerData: {
          name: this.editProducer.value.name,
          description: this.editProducer.value.description,
          address: this.editProducer.value.address,
          phoneNumber: this.editProducer.value.phoneNumber,
          taxIdentificationNumber: this.editProducer.value.taxIdentificationNumber,
          companyNumber: this.editProducer.value.companyNumber,
          website: this.editProducer.value.website,
          imageUrl: this.editProducer.value.imageUrl,
        }
      },
      'confirm'
    );
  }


}
