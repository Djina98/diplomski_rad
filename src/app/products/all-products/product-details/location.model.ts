/* eslint-disable no-trailing-spaces */
export class Location implements Location {
  constructor(public id: string, public productId: string, public latitude: string,
    public longitude: string, public dateFrom: Date, public dateTo: Date) { }
}

export interface Location {
  id: string;
  productId: string;
  latitude: string;
  longitude: string;
  dateFrom: Date;
  dateTo: Date;
}
