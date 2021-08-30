/* eslint-disable no-trailing-spaces */

export class Sertificate implements Sertificate{
  constructor(public id: string, public producerId: string, public type: SertificateType,
              public description: string, public placeOfIssue: string, public dateOfIssue: Date,
              public validFrom: Date, public validTo: Date,
              public authorizedPerson: string) { }
}

export interface Sertificate{
  id: string;
  producerId: string;
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
