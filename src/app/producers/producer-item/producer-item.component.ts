import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Producer } from '../producer.model';
import { ProducersService } from '../producers.service';

@Component({
  selector: 'app-producer-item',
  templateUrl: './producer-item.component.html',
  styleUrls: ['./producer-item.component.scss'],
})
export class ProducerItemComponent implements OnInit {
  @Input() producerItem: Producer;

  constructor(public authService: AuthService, private alertCtrl: AlertController,
    private producersService: ProducersService, private loadingCtrl: LoadingController,
    private navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {}

  onDeleteProducer(producer: Producer){
    this.alertCtrl.create({
    header: 'Brisanje proizvođača',
    message: `Da li ste sigurni da želite da obrišete proizvođača ${producer.name}?`,
    buttons:
      [{
        text: 'Odustani',
        role: 'cancel'
        }, {
        text: 'Obriši',
        handler: () => {

          this.producersService.deleteProducer(producer.id).subscribe(() => {
            this.navCtrl.navigateBack('/producers/tabs/all-producers');
          });
        }
      }]
      }).then(alertEl => {
        alertEl.present();
      });
  }
}
