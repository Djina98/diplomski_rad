/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  currentHeight: number = 0;


  constructor() { }

  ngOnInit() {}
}
