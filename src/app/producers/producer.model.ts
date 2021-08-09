export interface Producer {
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  taxIdentificationNumber: string;
  companyNumber: string;
  website: string;
  sertificate?: Sertificate;
}

export interface Sertificate{
  id: string;
  type: SertificateType;
  description: string;
  placeOfIssue: string;
  dateOfIssue: Date;
  validFrom: Date;
  validTo: Date;
  authorizedPerson: string;
}

export enum SertificateType{
  srpskiOrganski = 'Srpski organski sertifikat',
  evorpskiOrganski = 'Evropski organski sertifikat',
  haccp = 'HACCP sertifikat prostora',
  pozitivnaOdluka = 'Pozitivna odluka o sertifikaciji',
  ambalaza = 'Zdravstvena ispravnost ambalaze'
}
