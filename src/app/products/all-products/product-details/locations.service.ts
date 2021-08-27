/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from './location.model';

interface LocationData {
  productId: string;
  latitude: string;
  longitude: string;
  dateFrom: Date;
  dateTo: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private _locations = new BehaviorSubject<Location[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get locations() {
    return this._locations.asObservable();
  }

  addLocation(productId: string, latitude: string, longitude: string, dateFrom: Date, dateTo: Date) {
    let generatedId;
    let newLocation: Location;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
      newLocation = new Location(
        null,
        productId,
        latitude,
        longitude,
        dateFrom,
        dateTo
      );
      return this.http.post<{name: string}>(
        `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/locations.json?auth=${token}`, newLocation);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.locations;
      }),
      take(1),
      tap((locations) => {
        newLocation.id = generatedId;
        this._locations.next(locations.concat(newLocation));
      })
    );
  }

  getLocations(productId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.
          get<{[key: string]: LocationData}>(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/locations.json?auth=${token}`
            );
          }),
          map((locationData: any) => {
            const locations: Location[] = [];
            for(const key in locationData){
              if(locationData.hasOwnProperty(key) && locationData[key].productId === productId){
                locations.push(new Location(key, locationData[key].productId, locationData[key].latitude, locationData[key].longitude, locationData[key].dateFrom, locationData[key].dateTo)
                );
              }
            }
          return locations;
        }),
        tap(locations => {
          this._locations.next(locations);
        }));
  }
}