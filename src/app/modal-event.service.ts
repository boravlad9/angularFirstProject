import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ModalEventService {

  constructor(private http: HttpClient) { }

  getEvent(value : number) : Observable<Object>{
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`, 'security-token': 'test'})
    };
    return this.http.get(`http://meetprep.beta.bitstone.eu/api/v1/event/${value}`, httpOptions);
  }


}
