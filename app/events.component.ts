import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EventsHeaderComponent } from '../events-header/events-header.component';
import { LoginServiceService } from '../login-service.service';
import { EventService } from '../event.service';
import { DataEvent } from '../data-event';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


eventData : DataEvent[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginServiceService,
    private eventService: EventService
  ) {
    this.eventData = [];
  }

  ngOnInit() {
    this.getEvents();
  }

  onLogout(): void{
    this.authService.logout().subscribe(() => {
    if (!this.authService.getLoggedIn()) {
        const redirectUrl = '/login';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  myProfile(): void{
    this.router.navigate(["/my-profile"]);
  }

  getPrevEvents() : void{
    const items = this.eventService.getEventsPrev().subscribe((data) => {
      this.eventData = [];
      const stringifiedData = JSON.stringify(data);
      const parsedJson = JSON.parse(stringifiedData);
      for (let i = 0; i < parsedJson.data.items.length; i++){
        let temp = new DataEvent();
        temp.eventsName = parsedJson.data.items[i].name;
        temp.urlImage = parsedJson.data.items[i].image;
        temp.monthEvent = parsedJson.data.items[i].date.start_month;
        temp.dayEvent = parsedJson.data.items[i].date.day;
        this.eventData.push(temp);
      }
    });
  }

  getEvents(): void{
    const items = this.eventService.getEventsNext().subscribe((data) => {
      this.eventData = [];
      const stringifiedData = JSON.stringify(data);
      const parsedJson = JSON.parse(stringifiedData);
      for (let i = 0; i < parsedJson.data.items.length; i++){
        let temp = new DataEvent();
        temp.eventsName = parsedJson.data.items[i].name;
        temp.urlImage = parsedJson.data.items[i].image;
        temp.monthEvent = parsedJson.data.items[i].date.start_month;
        temp.dayEvent = parsedJson.data.items[i].date.day;
        this.eventData.push(temp);
      }
    });
  }

}
