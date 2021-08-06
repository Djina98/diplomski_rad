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
  fullname?: string;
  phoneNumber: number;
  email: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated = false;
  private user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  register(user: UserData){
    this.isUserAuthenticated = true;
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
    this.isUserAuthenticated = true;
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
}
