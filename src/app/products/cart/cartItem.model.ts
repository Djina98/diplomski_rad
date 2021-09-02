/* eslint-disable @typescript-eslint/quotes */
import { Product } from "../product.model";


export class CartItem implements CartItem{
  constructor(public id: string, public product: Product, public amount: number, public price: number, public userEmail: string) { }
}

export interface CartItem {
    id: string;
    product: Product;
    amount: number;
    price: number;
    userEmail: string;
}
