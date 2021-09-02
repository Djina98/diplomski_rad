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

  getLocation(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<LocationData>(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/locations/${id}.json?auth=${token}`
          );
        }),
        map((resData: LocationData) => {
          return new Location(
            id,
            resData.productId,
            resData.latitude,
            resData.longitude,
            resData.dateFrom,
            resData.dateTo
          );
        }
      )
    );
  }

  deleteLocation(id: string) {
    console.log('pozvao delete location: ' + id);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/locations/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.locations;
      }),
      take(1),
      tap((locations) => {
        this._locations.next(locations.filter((p) => p.id !== id));
      })
    );
  }

  deleteLocations(productId: string) {
    console.log('pozvao delete locations');
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.
          get<{[key: string]: LocationData}>(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/locations.json?auth=${token}`
            );
          }),
          map((locationData: any) => {
            for(const key in locationData){
              if(locationData.hasOwnProperty(key) && locationData[key].productId === productId){
                this.deleteLocation(locationData[key].id);
              }
            }
        })
    );
  }

  editLocation(
    id: string,
    productId: string,
    latitude: string,
    longitude: string,
    dateFrom: Date,
    dateTo: Date,
  )
    {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http.put(
            `https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/locations/${id}.json?auth=${token}`,
          {
            productId,
            latitude,
            longitude,
            dateFrom,
            dateTo,
          }
        );
      }), switchMap(() => {
          return this.locations;
      }),
      take(1),
      tap((locations) => {
        const updatedLocationIndex = locations.findIndex((p) => p.id === id);
        const updatedLocations = [...locations];
        updatedLocations[updatedLocationIndex] = new Location(
          id,
          productId,
          latitude,
          longitude,
          dateFrom,
          dateTo,
        );
        this._locations.next(updatedLocations);
      })
    );
  }
}
