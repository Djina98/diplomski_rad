/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Sertificate, SertificateType } from './sertificate.model';

interface SertificateData {
  producerId: string;
  type: SertificateType;
  description: string;
  placeOfIssue: string;
  dateOfIssue: Date;
  validFrom: Date;
  validTo: Date;
  authorizedPerson: string;
}

@Injectable({
  providedIn: 'root'
})
export class SertificatesService {
  private _sertificates = new BehaviorSubject<Sertificate[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get sertificates() {
    return this._sertificates.asObservable();
  }

  addSertificate(producerId: string, type: SertificateType, description: string, placeOfIssue: string,
              dateOfIssue: Date, validFrom: Date, validTo: Date, authorizedPerson: string) {
    let generatedId;
    let newSertificate: Sertificate;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
      newSertificate = new Sertificate(
        null,
        producerId,
        type,
        description,
        placeOfIssue,
        dateOfIssue,
        validFrom,
        validTo,
        authorizedPerson
      );
      return this.http.post<{name: string}>(
        `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/sertificates.json?auth=${token}`, newSertificate);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.sertificates;
      }),
      take(1),
      tap((sertificates) => {
        newSertificate.id = generatedId;
        this._sertificates.next(sertificates.concat(newSertificate));
      })
    );
  }

  getSertificates(producerId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.
          get<{[key: string]: SertificateData}>(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/sertificates.json?auth=${token}`
            );
          }),
          map((sertificateData: any) => {
            const sertificates: Sertificate[] = [];
            for(const key in sertificateData){
              if(sertificateData.hasOwnProperty(key) && sertificateData[key].producerId === producerId){
                sertificates.push(new Sertificate(key, sertificateData[key].producerId, sertificateData[key].type, sertificateData[key].description, sertificateData[key].placeOfIssue, sertificateData[key].dateOfIssue, sertificateData[key].validFrom, sertificateData[key].validTo, sertificateData[key].authorizedPerson)
                );
              }
            }
          return sertificates;
        }),
        tap(sertificates => {
          this._sertificates.next(sertificates);
        }));
  }

  getSertificate(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<SertificateData>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/sertificates/${id}.json?auth=${token}`
          );
        }),
        map((resData: SertificateData) => {
          return new Sertificate(
            id,
            resData.producerId,
            resData.type,
            resData.description,
            resData.placeOfIssue,
            resData.dateOfIssue,
            resData.validFrom,
            resData.validTo,
            resData.authorizedPerson
          );
        }
      )
    );
  }

  deleteSertificate(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/sertificates/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.sertificates;
      }),
      take(1),
      tap((sertificates) => {
        this._sertificates.next(sertificates.filter((p) => p.id !== id));
      })
    );
  }

  editSertificate(
    id: string,
    producerId: string,
    type: SertificateType,
    description: string,
    placeOfIssue: string,
    dateOfIssue: Date,
    validFrom: Date,
    validTo: Date,
    authorizedPerson: string,
  )
    {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.put(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/sertificates/${id}.json?auth=${token}`,
          {
            producerId,
            type,
            description,
            placeOfIssue,
            dateOfIssue,
            validFrom,
            validTo,
            authorizedPerson
          }
        );
      }), switchMap(() => {
          return this.sertificates;
      }),
      take(1),
      tap((sertificates) => {
        const updatedSertificateIndex = sertificates.findIndex((p) => p.id === id);
        const updatedSertificates = [...sertificates];
        updatedSertificates[updatedSertificateIndex] = new Sertificate(
          id,
          producerId,
          type,
          description,
          placeOfIssue,
          dateOfIssue,
          validFrom,
          validTo,
          authorizedPerson
        );
        this._sertificates.next(updatedSertificates);
      })
    );
  }

  deleteAllSertificates(producerId: string){
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{[key: string]: SertificateData}>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/sertificates.json?auth=${token}`
          );
        }), map((sertificateData: any) => {
          const sertificates: Sertificate[] = [];
          for(const key in sertificateData){
            if(sertificateData.hasOwnProperty(key) && sertificateData[key].producerId === producerId){
              this.deleteSertificate(key).subscribe(()=>{

              });
            }
          }
      return sertificates;
    }),
    tap(sertificates => {
      this._sertificates.next(sertificates);
    })
  );
  }
}
