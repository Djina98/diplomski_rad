import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SertificateType } from '../sertificate.model';

@Component({
  selector: 'app-sertificate-modal',
  templateUrl: './sertificate-modal.component.html',
  styleUrls: ['./sertificate-modal.component.scss'],
})
export class SertificateModalComponent implements OnInit {
  @Input() title: string;
  @Input() producerId: string;
  @Input() type: SertificateType;
  @Input() description: string;
  @Input() placeOfIssue: string;
  @Input() dateOfIssue: Date;
  @Input() validFrom: Date;
  @Input() validTo: Date;
  @Input() authorizedPerson: string;
  @ViewChild('sertificate', { static: true }) sertificate: NgForm;

  sertificateTypes = SertificateType;
  keys = [];

  constructor(private modalCtrl: ModalController) {
    this.keys=Object.keys(this.sertificateTypes);
   }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddSertificate(){
    if (!this.sertificate.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        sertificateData: {
          producerId: this.sertificate.value.producerId,
          type: this.sertificate.value.type,
          description: this.sertificate.value.description,
          placeOfIssue: this.sertificate.value.placeOfIssue,
          dateOfIssue: this.sertificate.value.dateOfIssue,
          validFrom: this.sertificate.value.validFrom,
          validTo: this.sertificate.value.validTo,
          authorizedPerson: this.sertificate.value.authorizedPerson,
        }
      },
      'confirm'
    );
  }


}
