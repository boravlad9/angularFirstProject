import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  eventsName : string[];
  currentPage = 0;
  nextLink : string = "http://meetprep.beta.bitstone.eu/api/v1/events";
  constructor(private http: HttpClient) {
      this.eventsName = ["ceva"];
   }

  getEventsPrev() : Observable<Object>{
    let httpOptions = {
      headers: new HttpHeaders({'security-token': 'test', 'Authorization': `Bearer ${localStorage.getItem('token')}`}) || {}
    };

    this.currentPage = this.currentPage - 1;
    if (this.currentPage == 0)
        this.currentPage = 1;
    return this.http.post(`http://meetprep.beta.bitstone.eu/api/v1/events?page=${this.currentPage}`, {'event_status': 2}, httpOptions).pipe(
      tap((data) => {
          const stringifiedData = JSON.stringify(data);
          const parsedJson = JSON.parse(stringifiedData);
          this.nextLink = parsedJson.data.pagination.next_page;
      })
    );

  }

  getEventsNext() : Observable<Object>{
    let httpOptions = {
      headers: new HttpHeaders({'security-token': 'test', 'Authorization': `Bearer ${localStorage.getItem('token')}`}) || {}
    };
    this.currentPage++;
    if (this.nextLink != null){
        return this.http.post(this.nextLink, {'event_status': 2}, httpOptions).pipe(
          tap(data => {
            const stringifiedData = JSON.stringify(data);
            const parsedJson = JSON.parse(stringifiedData);
            this.nextLink = parsedJson.data.pagination.next_page;
          })
        );
    }
    else{
      return this.getEventsPrev();
    }
  }



}
