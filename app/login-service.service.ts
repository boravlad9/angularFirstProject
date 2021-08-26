import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class LoginServiceService {
  httpOptions = {
    headers: new HttpHeaders({ 'security-token': 'test' })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getLoggedIn():boolean{
      if (localStorage.getItem("token"))
        return true;
      return false;
  }

  login(loginData : Object): Observable<Object> {
    return this.http.post("http://meetprep.beta.bitstone.eu/api/v1/login", loginData, this.httpOptions).pipe(
      tap(data => {
        const stringifiedData = JSON.stringify(data);
        const parsedJson = JSON.parse(stringifiedData);
        localStorage.setItem("username",`${parsedJson.data.user.first_name} ${parsedJson.data.user.last_name}`);
        localStorage.setItem("email", parsedJson.data.user.email);
        localStorage.setItem("token", parsedJson.data.authentication.access_token);
        localStorage.setItem("idUser", parsedJson.data.user.id);

      })
    );
  }

  logout(): Observable<Object>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`, 'security-token': 'test'})
    };
    return this.http.post("http://meetprep.beta.bitstone.eu/api/v1/logout", {}, httpOptions).pipe(
      tap(data => {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("idUser");
      })
    );
  }

}
