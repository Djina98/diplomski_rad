/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ProducerModalComponent } from '../../producer-modal/producer-modal.component';
import { Producer } from '../../producer.model';
import { ProducersService } from '../../producers.service';

@Component({
  selector: 'app-producer-details',
  templateUrl: './producer-details.page.html',
  styleUrls: ['./producer-details.page.scss'],
})
export class ProducerDetailsPage implements OnInit {

  producer: Producer;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private producersService: ProducersService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
    ) { }

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
          this.isLoading = false;
        });
    });
  }

  onDeleteProducer(){
    this.alertCtrl.create({
      header: 'Brisanje proizvođača',
      message: 'Da li ste sigurni da želite da obrišete proizvođača?',
      buttons:
      [{
          text: 'Odustani',
          role: 'cancel'
        }, {
          text: 'Obriši',
          handler: () => {

            this.producersService.deleteProducer(this.producer.id).subscribe(() => {
              this.navCtrl.navigateBack('/producers/tabs/all-producers');
            });
          }
        }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onEditProducer() {
    this.modalCtrl
      .create({
        component: ProducerModalComponent,
        componentProps: {
            name: this.producer.name, description: this.producer.description,
            address: this.producer.address, phoneNumber: this.producer.phoneNumber,
            taxIdentificationNumber: this.producer.taxIdentificationNumber,
            companyNumber: this.producer.companyNumber,
            website: this.producer.website, imageUrl: this.producer.imageUrl},
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
              this.producersService
                .editProducer(
                  this.producer.id,
                  resultData.data.producerData.name,
                  resultData.data.producerData.description,
                  resultData.data.producerData.address,
                  resultData.data.producerData.phoneNumber,
                  resultData.data.producerData.taxIdentificationNumber,
                  resultData.data.producerData.companyNumber,
                  resultData.data.producerData.website,
                  resultData.data.producerData.imageUrl,
                )
                .subscribe((producers) => {
                  this.producer.name = resultData.data.producerData.name;
                  this.producer.description = resultData.data.producerData.description;
                  this.producer.address = resultData.data.producerData.address;
                  this.producer.phoneNumber = resultData.data.producerData.phoneNumber;
                  this.producer.taxIdentificationNumber = resultData.data.producerData.taxIdentificationNumber;
                  this.producer.companyNumber = resultData.data.producerData.companyNumber;
                  this.producer.website = resultData.data.producerData.website;
                  this.producer.imageUrl = resultData.data.producerData.imageUrl;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

}