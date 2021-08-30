
export class Producer implements Producer{
  constructor(public id: string, public name: string, public description: string,
              public address: string, public phoneNumber: string,
              public taxIdentificationNumber: string, public companyNumber: string,
              public website: string, public imageUrl: string) { }
}

export interface Producer {
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  taxIdentificationNumber: string;
  companyNumber: string;
  website: string;
  imageUrl: string;
}
