import { Injectable } from '@angular/core';
import { HoneyTypes, Packaging, Product } from './product.model';

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
      imageUrl: 'https://www.timomed.co.rs/images/proizvodi/Organski-med.png'
    }
  ];

  constructor() { }

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
}
