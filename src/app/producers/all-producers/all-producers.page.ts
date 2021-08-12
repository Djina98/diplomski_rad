import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producer } from '../producer.model';
import { ProducersService } from '../producers.service';

@Component({
  selector: 'app-all-producers',
  templateUrl: './all-producers.page.html',
  styleUrls: ['./all-producers.page.scss'],
})
export class AllProducersPage implements OnInit, OnDestroy {

  producers: Producer[];
  private producersSub: Subscription;

  constructor(private producersService: ProducersService) { }

  ngOnInit() {
    this.producersSub = this.producersService.producers.subscribe(producers => {
      console.log(producers);
      this.producers = producers;
    });
  }

  ionViewWillEnter() {
    this.producersService.getProducers().subscribe(producers => {
    });
  }

  ngOnDestroy() {
    if (this.producersSub) {
      this.producersSub.unsubscribe();
    }
  }

}
