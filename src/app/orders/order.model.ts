/* eslint-disable @typescript-eslint/quotes */
import { CartItem } from "../products/cart/cartItem.model";

export class Order implements Order{
  constructor(public id: string, public products: CartItem[], public totalPrice: number,
              public fullname: string, public email: string,
              public phoneNumber: string, public city: string,
              public street: string, public streetNumber: number, public date: Date,
              public status: string) { }
}

export interface Product {
    id: string;
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
