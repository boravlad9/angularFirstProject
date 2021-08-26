import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'eventHeader',
  templateUrl: './events-header.component.html',
  styleUrls: ['./events-header.component.css']
})
export class EventsHeaderComponent implements OnInit {

  email : string | null;
  username : string | null;
  constructor() {
    this.email = "";
    this.username = "";
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.username = localStorage.getItem("username");
  }

}
