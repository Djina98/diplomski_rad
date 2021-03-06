/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
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

  constructor(private http: HttpClient, private authService: AuthService) { }

  get producers() {
    return this._producers.asObservable();
  }

  addProducer(name: string, description: string, address: string, phoneNumber: string,
    taxIdentificationNumber: string, companyNumber: string, website: string, imageUrl: string) {
      let generatedId;
      let newProducer: Producer;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        newProducer = new Producer(
          null,
          name,
          description,
          address,
          phoneNumber,
          taxIdentificationNumber,
          companyNumber,
          website,
          imageUrl
        );
        return this.http.post<{name: string}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers.json?auth=${token}`, newProducer);
        }),
        take(1),
        switchMap((resData) => {
          generatedId = resData.name;
          return this.producers;
        }),
        take(1),
        tap((producers) => {
          newProducer.id = generatedId;
          this._producers.next(producers.concat(newProducer));
        })
      );
  }

  getProducers() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{[key: string]: ProducerData}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers.json?auth=${token}`
          );
        }),
        map((producerData: any) => {
          const producers: Producer[] = [];

          for(const key in producerData){
            if(producerData.hasOwnProperty(key)){
              producers.push(new Producer(key, producerData[key].name, producerData[key].description, producerData[key].address, producerData[key].phoneNumber, producerData[key].taxIdentificationNumber, producerData[key].companyNumber, producerData[key].website, producerData[key].imageUrl)
              );
            }
          }
        return producers;
      }),
      tap(producers => {
        this._producers.next(producers);
      }));
  }

  getProducer(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<ProducerData>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers/${id}.json?auth=${token}`
          );
        }),
        map((resData: ProducerData) => {
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
        }
      )
    );
  }

  deleteProducer(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
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
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.put(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/producers/${id}.json?auth=${token}`,
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
          );
      }), switchMap(() => {
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
    }));
  }


}
