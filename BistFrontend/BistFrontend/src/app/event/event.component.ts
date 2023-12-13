import { Component, OnInit } from '@angular/core';
import { EventserviceService } from '../Service/eventservice.service';
import { EventModel } from '../Models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventData: EventModel = {};
  eventt: any[] = [];

  constructor(private eventService: EventserviceService) { }

  ngOnInit(): void {
    
    
  }
  submitEvent(): void {
    this.eventService.postEvent(this.eventData).subscribe(
        response => {
          console.log(response);
        
          this.eventData = {};
        },
        error => {
          console.error(error);
        }
      );
  }

}
