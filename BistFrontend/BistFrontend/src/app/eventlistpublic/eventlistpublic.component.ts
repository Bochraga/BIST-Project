import { Component, OnInit } from '@angular/core';
import { EventserviceService } from '../Service/eventservice.service';
import { EventModel } from '../Models/event';

@Component({
  selector: 'app-eventlistpublic',
  templateUrl: './eventlistpublic.component.html',
  styleUrls: ['./eventlistpublic.component.css']
})
export class EventlistpublicComponent implements OnInit {
  events: EventModel[] = [];

  constructor(private eventService: EventserviceService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEventsall().subscribe(
      (response: EventModel[]) => {
        console.log(response);
        this.events = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
