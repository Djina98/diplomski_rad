/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from 'src/app/orders/order.model';
import { Product } from '../product.model';
import { CartItem } from './cartItem.model';

interface CartItemData {
  product: Product;
  amount: number;
  userEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get cartItems() {
    return this._cartItems.asObservable();
  }

  getCartItems(userEmail: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{[key: string]: CartItemData}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/carts.json?auth=${token}`
          );
        }), map((cartData: any) => {
          const cartItems: CartItem[] = [];
          for(const key in cartData){
            if(cartData.hasOwnProperty(key) && cartData[key].userEmail === userEmail){
              cartItems.push(new CartItem(key, cartData[key].product, cartData[key].amount, cartData[key].userEmail)
              );
            }
          }
      return cartItems;
    }),
    tap(cartItems => {
      this._cartItems.next(cartItems);
    })
  );
  }

  addToCart(product: Product, amount: number){
    let generatedId;
    let newCartItem: CartItem;
    const userEmail = this.authService.currentUser.email;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        newCartItem = new CartItem(
          null,
          product,
          amount,
          userEmail
        );
      return this.http.post<{name: string}>(
        `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/carts.json?auth=${token}`, newCartItem);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.cartItems;
      }),
      take(1),
      tap((cartItems) => {
        newCartItem.id = generatedId;
        this._cartItems.next(cartItems.concat(newCartItem));
      })
    );
  }

  remove(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/carts/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.cartItems;
      }),
      take(1),
      tap((cartItems) => {
        this._cartItems.next(cartItems.filter((p) => p.id !== id));
      })
    );
  }

}
