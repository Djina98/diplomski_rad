export interface Product {
    id: string;
    title: string;
    type: HoneyTypes;
    amount: number;
    price: number;
    description: string;
    yearOfProduction: number;
    packaging: Packaging;
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
