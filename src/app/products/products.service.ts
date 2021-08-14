/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Producer } from '../producers/producer.model';
import { ProducersService } from '../producers/producers.service';
import { HoneyTypes, Packaging, Product } from './product.model';

interface ProductData {
  name: string;
  type: HoneyTypes;
  amount: number;
  price: number;
  description: string;
  yearOfProduction: number;
  packaging: Packaging;
  producer: Producer;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private _products = new BehaviorSubject<Product[]>([]);

  /*private products: Product[]  = [
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
  ];*/

  constructor(private producersService: ProducersService, private http: HttpClient) { }

  get products() {
    return this._products.asObservable();
  }

  /*
  getAllProducts() {
    return [...this.products];
  }

  getProduct(productId: string){
    return {
      ...this.products.find(product => product.id === productId)
    };
  }
  */
  addProduct(name: string, type: HoneyTypes, description: string, amount: number, price: number,
            yearOfProduction: number, packaging: Packaging, producer: Producer, imageUrl: string) {
              let generatedId;

              return this.http.post<{name: string}>(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products.json`,
              { name,
                type,
                description,
                amount,
                price,
                yearOfProduction,
                packaging,
                producer,
                imageUrl
              }).pipe(switchMap((resData) => {

                generatedId = resData.name;
                return this.products;

              }), take(1), tap(products => {
                this._products.next(products.concat({
                  id: generatedId,
                  name,
                  type,
                  amount,
                  price,
                  description,
                  yearOfProduction,
                  packaging,
                  producer,
                  imageUrl
                }));
              }));
  }

  getProducts() {
    return this.http.
    get<{[key: string]: ProductData}>(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products.json`)
    .pipe(map((productData) => {
      const products: Product[] = [];

      for(const key in productData){
        if(productData.hasOwnProperty(key)){
          products.push({
            id: key,
            name: productData[key].name,
            type: productData[key].type,
            description: productData[key].description,
            amount: productData[key].amount,
            price: productData[key].price,
            yearOfProduction: productData[key].yearOfProduction,
            packaging: productData[key].packaging,
            producer: productData[key].producer,
            imageUrl: productData[key].imageUrl,
          });
        }
      }
      this._products.next(products);
      return products;
    }));
  }

  getProduct(id: string) {
    return this.http
    .get<ProductData>(
      `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`)
      .pipe(map((resData: ProductData) => {
        return new Product(
          id,
          resData.name,
          resData.type,
          resData.description,
          resData.amount,
          resData.price,
          resData.yearOfProduction,
          resData.packaging,
          resData.producer,
          resData.imageUrl
        );
      }));
  }

  deleteProduct(id: string) {
        return this.http.delete(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`)
        .pipe(switchMap(() => {
          return this.products;
        }),
        take(1),
        tap((products) => {
          this._products.next(products.filter((p) => p.id !== id));
        })
      );
  }

  editProduct(
    id: string,
    name: string,
    type: HoneyTypes,
    description: string,
    amount: number,
    price: number,
    yearOfProduction: number,
    packaging: Packaging,
    producer: Producer,
    imageUrl: string,
  )
    {
      return this.http
      .put(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
        {
          name,
          type,
          description,
          amount,
          price,
          yearOfProduction,
          packaging,
          producer,
          imageUrl
        }
      )
      .pipe(switchMap(() => {
        return this.products;
      }),
      take(1),
      tap((products) => {
        const updatedProductIndex = products.findIndex((p) => p.id === id);
        const updatedProducts = [...products];
        updatedProducts[updatedProductIndex] = new Product(
          id,
          name,
          type,
          description,
          amount,
          price,
          yearOfProduction,
          packaging,
          producer,
          imageUrl
        );
        this._products.next(updatedProducts);
      })
    );
  }
}
