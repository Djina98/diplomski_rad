/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import { Producer } from "../producers/producer.model";

export class Product implements Product{
  constructor(public id: string, public name: string, public type: HoneyTypes,
              public description: string, public amount: number,
              public price: number, public yearOfProduction: number,
              public packaging: Packaging, public producer: Producer, public imageUrl: string) { }
}

export interface Product {
    id: string;
    name: string;
    type: HoneyTypes;
    description: string;
    amount: number;
    price: number;
    yearOfProduction: number;
    packaging: Packaging;
    producer: Producer;
    imageUrl: string;
}

export enum HoneyTypes {
  lipov = 'Lipov med',
  livadski = 'Livadski med',
  cvetni = 'Cvetni med',
  bagremov = 'Bagremov med',
  heljdin = 'Heljdin med',
  kaduljin = 'Kaduljin med',
  kestenov = 'Kestenov med',
  dracin = 'Dračin med',
  planinski = 'Planinski med',
  lavandin = 'Lavandin med',
  glogov = 'Glogov med',
  evodijin = 'Evodijin med',
  vreskov = 'Vreskov med',
  suncokretov = 'Suncokretov med',
  amorfin = 'Amorfin med',
  odMaslacka = 'Med od maslačka',
  ruzmarinov = 'Ruzmarinov med',
  repicin = 'Repičin med',
  zlatosipkin = 'Zlatošipkin med',
  sumski = 'Šumski med (Medljikovac)',
  manuka = 'Manuka med'
}

export enum Packaging {
  plasticnaBoca = 'Plastična boca',
  staklenaTeglica = 'Staklena teglica'
}
