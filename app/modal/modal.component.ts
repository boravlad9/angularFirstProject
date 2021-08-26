import { Component, OnInit, Input} from '@angular/core';
import { DetailsEvent } from '../details-event';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input('showEvents') eventData : DetailsEvent;
  inchis : boolean = true;

  public changeState(){
    this.inchis = !this.inchis;
    console.log(this.eventData);
  }

  ngOnInit(): void {
  }

}
