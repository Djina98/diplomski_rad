/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Producer } from 'src/app/producers/producer.model';
import { ProducersService } from 'src/app/producers/producers.service';
import { SertificateModalComponent } from '../sertificate-modal/sertificate-modal.component';
import { Sertificate, SertificateType } from '../sertificate.model';
import { SertificatesService } from '../sertificates.service';

@Component({
  selector: 'app-sertificate-details',
  templateUrl: './sertificate-details.page.html',
  styleUrls: ['./sertificate-details.page.scss'],
})
export class SertificateDetailsPage implements OnInit {

  sertificate: Sertificate;
  producer: Producer;
  isLoading = false;
  sertificateTypes = SertificateType;
  keys = [];

  constructor(
    private route: ActivatedRoute,
    private sertificatesService: SertificatesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private producersService: ProducersService) {
      this.keys=Object.keys(this.sertificateTypes);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {

      if (!paramMap.has('producerId')) {
        this.navCtrl.navigateBack('/producers/tabs/all-producers');
        return;
      }

      this.isLoading = true;

      this.producersService
        .getProducer(paramMap.get('producerId'))
        .subscribe((producer) => {
          this.producer = producer;
        });

      if (!paramMap.has('sertificateId')) {
        this.navCtrl.navigateBack(`/producers/tabs/all-producers/${this.producer.id}`);
        return;
      }

      this.sertificatesService
        .getSertificate(paramMap.get('sertificateId'))
        .subscribe((sertificate) => {
          this.sertificate = sertificate;
          this.isLoading = false;
        });
    });
  }

  onDeleteSertificate(){
    this.alertCtrl.create({
      header: 'Brisanje sertifikata',
      message: 'Da li ste sigurni da želite da obrišete ovaj sertifikat?',
      buttons:
      [{
          text: 'Odustani',
          role: 'cancel'
        }, {
          text: 'Obriši',
          handler: () => {

            this.sertificatesService.deleteSertificate(this.sertificate.id).subscribe(() => {
              this.navCtrl.navigateBack(`/producers/tabs/all-producers/${this.producer.id}`);
            });
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onEditSertificate() {
    this.modalCtrl
      .create({
        component: SertificateModalComponent,
        componentProps: {
            title: 'Izmena sertifikata',
            producerId: this.sertificate.producerId, type: this.sertificate.type,
            description: this.sertificate.description, placeOfIssue: this.sertificate.placeOfIssue,
            dateOfIssue: this.sertificate.dateOfIssue, validFrom: this.sertificate.validFrom,
            validTo: this.sertificate.validTo, authorizedPerson: this.sertificate.authorizedPerson},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Čuvanje...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.sertificatesService
                .editSertificate(
                  this.sertificate.id,
                  resultData.data.sertificateData.producerId,
                  resultData.data.sertificateData.type,
                  resultData.data.sertificateData.description,
                  resultData.data.sertificateData.placeOfIssue,
                  resultData.data.sertificateData.dateOfIssue,
                  resultData.data.sertificateData.validFrom,
                  resultData.data.sertificateData.validTo,
                  resultData.data.sertificateData.authorizedPerson,
                )
                .subscribe((sertificates) => {
                  this.sertificate.producerId = resultData.data.sertificateData.producerId;
                  this.sertificate.type = resultData.data.sertificateData.type;
                  this.sertificate.description = resultData.data.sertificateData.description;
                  this.sertificate.placeOfIssue = resultData.data.sertificateData.placeOfIssue;
                  this.sertificate.dateOfIssue = resultData.data.sertificateData.dateOfIssue;
                  this.sertificate.validFrom = resultData.data.sertificateData.validFrom;
                  this.sertificate.validTo = resultData.data.sertificateData.validTo;
                  this.sertificate.authorizedPerson = resultData.data.sertificateData.authorizedPerson;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

}
