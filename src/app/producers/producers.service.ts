/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Producer } from './producer.model';

interface ProducerData {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  taxIdentificationNumber: string;
  companyNumber: string;
  imageUrl: string;
  website: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProducersService {

  private _producers = new BehaviorSubject<Producer[]>([]);

  /*
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
  */

  constructor(private http: HttpClient) { }

  get producers() {
    return this._producers.asObservable();
  }

  addProducer(name: string, description: string, address: string, phoneNumber: string,
    taxIdentificationNumber: string, companyNumber: string, website: string, imageUrl: string) {
      let generatedId;

      return this.http.post<{name: string}>(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers.json`,
      { name,
        description,
        address,
        phoneNumber,
        taxIdentificationNumber,
        companyNumber,
        website,
        imageUrl,
      }).pipe(switchMap((resData) => {

        generatedId = resData.name;
        return this.producers;

      }), take(1), tap(producers => {
        this._producers.next(producers.concat({
          id: generatedId,
          name,
          description,
          address,
          phoneNumber,
          taxIdentificationNumber,
          companyNumber,
          website,
          imageUrl,
        }));
      })
    );
  }

  getProducers() {
  return this.http.
  get<{[key: string]: ProducerData}>(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers.json`)
  .pipe(map((producerData) => {
  const producers: Producer[] = [];

  for(const key in producerData){
  if(producerData.hasOwnProperty(key)){
    producers.push({
      id: key,
      name: producerData[key].name,
      description: producerData[key].description,
      address: producerData[key].address,
      phoneNumber: producerData[key].phoneNumber,
      taxIdentificationNumber: producerData[key].taxIdentificationNumber,
      companyNumber: producerData[key].companyNumber,
      website: producerData[key].website,
      imageUrl: producerData[key].imageUrl,
    });
  }
  }
  this._producers.next(producers);
  return producers;
  }));
  }

  getProducer(id: string) {
    return this.http
    .get<ProducerData>(
    `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers/${id}.json`)
    .pipe(map((resData: ProducerData) => {
      return new Producer(
        id,
        resData.name,
        resData.description,
        resData.address,
        resData.phoneNumber,
        resData.taxIdentificationNumber,
        resData.companyNumber,
        resData.website,
        resData.imageUrl
      );
    }));
  }

  deleteProducer(id: string) {
    return this.http.delete(
      `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers/${id}.json`)
    .pipe(switchMap(() => {
      return this.producers;
    }),
    take(1),
    tap((producers) => {
      this._producers.next(producers.filter((p) => p.id !== id));
    })
    );
  }

  editProducer(
    id: string,
    name: string,
    description: string,
    address: string,
    phoneNumber: string,
    taxIdentificationNumber: string,
    companyNumber: string,
    website: string,
    imageUrl: string
    )
    {
    return this.http
    .put(`https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers/${id}.json`,
    {
      name,
      description,
      address,
      phoneNumber,
      taxIdentificationNumber,
      companyNumber,
      website,
      imageUrl,
    }
    )
    .pipe(switchMap(() => {
    return this.producers;
    }),
    take(1),
    tap((producers) => {
    const updatedProducerIndex = producers.findIndex((p) => p.id === id);
    const updatedProducers = [...producers];
    updatedProducers[updatedProducerIndex] = new Producer(
      id,
      name,
      description,
      address,
      phoneNumber,
      taxIdentificationNumber,
      companyNumber,
      website,
      imageUrl
    );
    this._producers.next(updatedProducers);
    })
    );
  }


}
