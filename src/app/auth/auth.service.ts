/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;

}

interface UserData {
  fullname: string;
  phoneNumber: number;
  address: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRole = 'user';
  private adminRole = 'admin';
  private _isUserAuthenticated = false;
  private user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get isUserAuthenticated(): boolean{
    return this._isUserAuthenticated;
  }

  register(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
              {email: user.email, password: user.password, returnSecureToken: true})
            .pipe(
            tap((userData) => {
              const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
              const newUser = new User(userData.localId, userData.email, userData.idToken, expirationTime);
              this.user.next(newUser);

            })
        );

  }

  login(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
                                            ${environment.firebaseAPIKey}`,
              {email: user.email, password: user.password, returnSecureToken: true})
            .pipe(
            tap((userData) => {
              const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
              const newUser = new User(userData.localId, userData.email, userData.idToken, expirationTime);
              this.user.next(newUser);
            })
        );
  }

  logout() {
    this.user.next(null);
  }

  addUser(user: UserData){
    if(user.email === 'admin@admin.com'){
      return this.http.post<{name: string}>(
        'https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
          fullname: user.fullname, phoneNumber: user.phoneNumber, address: user.address,
          email: user.email, role: this.adminRole
      });
    }else{
      return this.http.post<{name: string}>(
        'https://diplomski-a6b5f-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
          fullname: user.fullname, phoneNumber: user.phoneNumber, address: user.address,
          email: user.email, role: this.userRole
      });
    }
  }
}
