/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Producer } from '../producers/producer.model';
import { ProducersService } from '../producers/producers.service';
import { LocationsService } from './all-products/product-details/locations.service';
import { HoneyTypes, Packaging, Product } from './product.model';

interface ProductData {
  name: string;
  type: HoneyTypes;
  amount: number;
  price: number;
  description: string;
  yearOfProduction: number;
  packaging: Packaging;
  inStock: number;
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

  constructor(private producersService: ProducersService, private http: HttpClient,
              private authService: AuthService, private locationsService: LocationsService) { }

  get products() {
    return this._products.asObservable();
  }

  addProduct(name: string, type: HoneyTypes, description: string, amount: number, price: number,
            yearOfProduction: number, packaging: Packaging, inStock: number, producer: Producer,
            imageUrl: string) {
    let generatedId;
    let newProduct: Product;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        newProduct = new Product(
          null,
          name,
          type,
          description,
          amount,
          price,
          yearOfProduction,
          packaging,
          inStock,
          producer,
          imageUrl
        );
        return this.http.post<{name: string}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`, newProduct);
        }),
        take(1),
        switchMap((resData) => {
          generatedId = resData.name;
          return this.products;
        }),
        take(1),
        tap((products) => {
          newProduct.id = generatedId;
          this._products.next(products.concat(newProduct));
        })
      );
  }

  getProducts() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.
          get<{[key: string]: ProductData}>(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`
            );
          }),
          map((productData: any) => {
            const products: Product[] = [];
            for(const key in productData){
              if(productData.hasOwnProperty(key)){
                products.push(new Product(key, productData[key].name, productData[key].type, productData[key].description, productData[key].amount, productData[key].price, productData[key].yearOfProduction, productData[key].packaging, productData[key].inStock, productData[key].producer, productData[key].imageUrl)
                );
              }
            }
          return products;
        }),
        tap(products => {
          this._products.next(products);
        }));
  }

  getProduct(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<ProductData>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`
          );
        }),
        map((resData: ProductData) => {
          return new Product(
            id,
            resData.name,
            resData.type,
            resData.description,
            resData.amount,
            resData.price,
            resData.yearOfProduction,
            resData.packaging,
            resData.inStock,
            resData.producer,
            resData.imageUrl
          );
        }
      )
    );
  }

  deleteProduct(id: string) {
    this.locationsService.deleteLocations(id);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
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
    inStock: number,
    producer: Producer,
    imageUrl: string,
  )
    {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.put(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
          {
            name,
            type,
            description,
            amount,
            price,
            yearOfProduction,
            packaging,
            inStock,
            producer,
            imageUrl
          }
        );
      }), switchMap(() => {
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
          inStock,
          producer,
          imageUrl
        );
        this._products.next(updatedProducts);
      })
    );
  }
}
