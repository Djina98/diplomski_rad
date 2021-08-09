/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producer } from '../producers/producer.model';
import { ProducersService } from '../producers/producers.service';
import { HoneyTypes, Packaging, Product } from './product.model';

interface ProductData {
  title: string;
  type: HoneyTypes;
  amount: number;
  price: number;
  description: string;
  yearOfProduction: number;
  packaging: Packaging;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Product[]  = [
    {
      id: '1',
      title: 'Med sa ekstraktom crvenog grožđa',
      type: HoneyTypes.livadski,
      amount: 500,
      price: 3000,
      description: `Livadski med sadrži nektar i polen iz velikog broja različitih biljaka
                    čija mu raznovrsnost daje bogatsvo blagotvornih uticaja na organizam.
                    Zbog raznolikosti nektara i polena u njemu variraju mu boja i ukus.
                    Pošto je nefiltriran može da sadrži trunčice saća.
                    Kristalizacija je svojstvo svakog prirodnog meda.`,
      yearOfProduction: 2021,
      packaging: Packaging.staklenaTeglica,
      //producer: this.producersService.getAllProducers[1],
      imageUrl: 'https://www.timomed.co.rs/images/proizvodi/Organski-med.png'
    },
    {
      id: '2',
      title: 'Med sa ekstraktom crvenog grožđa',
      type: HoneyTypes.livadski,
      amount: 500,
      price: 3000,
      description: `Livadski med sadrži nektar i polen iz velikog broja različitih biljaka
                    čija mu raznovrsnost daje bogatsvo blagotvornih uticaja na organizam.
                    Zbog raznolikosti nektara i polena u njemu variraju mu boja i ukus.
                    Pošto je nefiltriran može da sadrži trunčice saća.
                    Kristalizacija je svojstvo svakog prirodnog meda.`,
      yearOfProduction: 2021,
      packaging: Packaging.staklenaTeglica,
      //producer: this.producersService.getAllProducers[1],
      imageUrl: 'https://www.timomed.co.rs/images/proizvodi/Organski-med.png'
    }
  ];

  constructor(private producersService: ProducersService, private http: HttpClient) { }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(productId: string){
    return {
      ...this.products.find(product => product.id === productId)
    };
  }

  deleteProduct(productId: string){
    this.products = this.products.filter(product =>
      product.id !== productId
    );
  }

  addProduct(title: string, type: HoneyTypes, amount: number, price: number, description: string,
            yearOfProduction: number, packaging: Packaging, imageUrl: string) {
              return this.http.post<{name: string}>(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products.json`,
              {title,
                type,
                amount,
                price,
                description,
                yearOfProduction,
                packaging,
                imageUrl
              });
  }

  getProducts() {
    return this.http.get<{[key: string]: ProductData}>(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products.json`);
  }
}
