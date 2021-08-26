import { Component, OnInit, Input} from '@angular/core';

import { EventService } from '../event.service';
import { DataEvent } from '../data-event';
import { DetailsEvent } from '../details-event';
import { ModalEventService } from '../modal-event.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ModalComponent} from '../modal/modal.component';
import { ViewChild } from '@angular/core'


@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input('showEvents') eventsName : DataEvent[];
  @ViewChild('child') child:ModalComponent;

  detaliiEveniment : DetailsEvent;
  constructor(private eventService: EventService, private modalEvent : ModalEventService) {

      this.eventsName = [];
      this.detaliiEveniment = new DetailsEvent();
  }

  ngOnInit(): void {

  }


  showModal(indexEvent : number){
    this.modalEvent.getEvent(this.eventsName[indexEvent].id).subscribe((data) => {
      const stringifiedData = JSON.stringify(data);
      const parsedJson = JSON.parse(stringifiedData);
      this.detaliiEveniment.description = parsedJson.data.description;
      this.detaliiEveniment.location = parsedJson.data.location;
      this.detaliiEveniment.name = parsedJson.data.name;
      this.child.changeState();
    });

  }

}
