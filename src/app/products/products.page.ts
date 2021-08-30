import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() { }

}
