import { Injectable } from '@angular/core';
import { Producer } from './producer.model';

@Injectable({
  providedIn: 'root'
})
export class ProducersService {

  private producers: Producer[] = [
    {
      id: '1',
      name: 'Timomed',
      address: 'Kej Veljka Vlahovića 7 Knjaževac',
      phoneNumber: '+381 (0)19 732-330',
      taxIdentificationNumber: '100634023',
      companyNumber: '07584172',
      description: `"Timomed" organizuje proizvodnju primarnih pčelinjih proizvoda: meda, voska,
                    propolisa, polena, matičnog mleča, obezbeđuje repromaterijal i hranu za pčele.
                    Proizvodnja je delimično organizovana na sopstvenom pčelinjaku sa preko
                    500 košnica, a ostalo kod pčelara kooperanata.
                    Količine primarnih pčelinjih proizvoda koje su potrebne za angažovanje celokupnih
                    proizvodnih kapaciteta nabavljaju se i otkupom od ostalih pčelara koji nisu
                    direktni kooperanti, sa područja opština Knjaževac, Zaječar, Sokobanja i Negotin.`,
      website: 'https://www.timomed.co.rs/sr/',
    },
  ];

  constructor() { }

  getAllProducers() {
    return this.producers;
  }
}
