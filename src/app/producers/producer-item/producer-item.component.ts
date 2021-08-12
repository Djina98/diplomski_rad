import { Component, Input, OnInit } from '@angular/core';
import { Producer } from '../producer.model';

@Component({
  selector: 'app-producer-item',
  templateUrl: './producer-item.component.html',
  styleUrls: ['./producer-item.component.scss'],
})
export class ProducerItemComponent implements OnInit {
  @Input() producerItem: Producer;

  constructor() { }

  ngOnInit() {}

}
