import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`, 'security-token': 'test'})
    };
    return this.http.get(`http://meetprep.beta.bitstone.eu/api/v1/user/${localStorage.getItem("idUser")}`, httpOptions).pipe(
      tap(data => {
      })
    );
  }

  changeUserAvatar(formData : FormData): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`, 'security-token': 'test'})
    };
    const uploadUrl = 'http://meetprep.beta.bitstone.eu/api/v1/upload';
    return this.http.post(uploadUrl, formData, httpOptions);

  }

}
