/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CartItem } from '../products/cart/cartItem.model';
import { Order } from './order.model';

interface OrderData {
  products: CartItem[];
  totalPrice: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  streetNumber: number;
  date: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _orders = new BehaviorSubject<Order[]>([]);
  private _userOrders = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get userOrders() {
    return this._userOrders.asObservable();
  }

  get orders() {
    return this._orders.asObservable();
  }

  getOrders() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{[key: string]: OrderData}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth=${token}`
          );
        }), map((orderData: any) => {
          const orders: Order[] = [];
          for(const key in orderData){
            if(orderData.hasOwnProperty(key)){
              orders.push(new Order(key, orderData[key].products, orderData[key].totalPrice, orderData[key].fullname, orderData[key].email, orderData[key].phoneNumber, orderData[key].city, orderData[key].street, orderData[key].streetNumber, orderData[key].date, orderData[key].status)
              );
            }
          }
      return orders;
    }),
    tap(orders => {
      this._orders.next(orders);
    })
  );
  }

  getUserOrders() {
    const userEmail = this.authService.currentUser.email;
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{[key: string]: OrderData}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth=${token}`
          );
        }), map((orderData: any) => {
          const userOrders: Order[] = [];
          for(const key in orderData){
            if(orderData.hasOwnProperty(key) && orderData[key].email === userEmail){
              userOrders.push(new Order(key, orderData[key].products, orderData[key].totalPrice, orderData[key].fullname, orderData[key].email, orderData[key].phoneNumber, orderData[key].city, orderData[key].street, orderData[key].streetNumber, orderData[key].date, orderData[key].status)
              );
            }
          }
      return userOrders;
    }),
    tap(userOrders => {
      this._userOrders.next(userOrders);
    })
  );
  }

  order(products: CartItem[], totalPrice: number, fullname: string, email: string, phoneNumber: string, city: string,
        street: string, streetNumber: number, status: string){
    let generatedId;
    let newOrder: Order;
    let date = new Date();

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        newOrder = new Order(
          null,
          products,
          totalPrice,
          fullname,
          email,
          phoneNumber,
          city,
          street,
          streetNumber,
          date,
          status
        );
      return this.http.post<{name: string}>(
        `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth=${token}`, newOrder);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.orders;
      }),
      take(1),
      tap((orders) => {
        newOrder.id = generatedId;
        this._orders.next(orders.concat(newOrder));
      })
    );
  }

  getOrder(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<OrderData>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/orders/${id}.json?auth=${token}`
          );
        }),
        map((resData: OrderData) => {
          return new Order(
            id,
            resData.products,
            resData.totalPrice,
            resData.fullname,
            resData.email,
            resData.phoneNumber,
            resData.city,
            resData.street,
            resData.streetNumber,
            resData.date,
            resData.status
          );
        }
      )
    );
  }

  getUserOrder(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<OrderData>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/orders/${id}.json?auth=${token}`
          );
        }),
        map((resData: OrderData) => {
          return new Order(
            id,
            resData.products,
            resData.totalPrice,
            resData.fullname,
            resData.email,
            resData.phoneNumber,
            resData.city,
            resData.street,
            resData.streetNumber,
            resData.date,
            resData.status
          );
        }
      )
    );
  }

  editOrder(
    id: string,
    products: CartItem[],
    totalPrice: number,
    fullname: string,
    email: string,
    phoneNumber: string,
    city: string,
    street: string,
    streetNumber: number,
    date: Date,
    status: string
    )
    {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.put(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/orders/${id}.json?auth=${token}`,
          {
            products,
            totalPrice,
            fullname,
            email,
            phoneNumber,
            city,
            street,
            streetNumber,
            date,
            status
          }
          );
      }), switchMap(() => {
          return this.orders;
      }),
      take(1),
      tap((orders) => {
        const updatedOrderIndex = orders.findIndex((p) => p.id === id);
        const updatedOrders = [...orders];
        updatedOrders[updatedOrderIndex] = new Order(
          id,
          products,
          totalPrice,
          fullname,
          email,
          phoneNumber,
          city,
          street,
          streetNumber,
          date,
          status
        );
      this._orders.next(updatedOrders);
    }));
  }
}
