import { Component, OnInit } from '@angular/core';
import { EventserviceService } from '../Service/eventservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventModel } from '../Models/event';

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.css']
})
export class EventUserComponent implements OnInit {
  events: EventModel[] = [];
  term: string = '';
  filterValue: string = '';
  userRole: string='';

  

  constructor(private eventService: EventserviceService , private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEventsall().subscribe(
      response => {
        this.events = response; // Assign the response to the events array
      },
      error => {
        console.error(error);
      }
    );
  }

  participateEvent(eventId: number): void {
    this.eventService.participateEvent(eventId).subscribe(
      response => {
        console.log(response);
        // Remove the event from the list after successful participation
        this.events = this.events.filter(event => event.id !== eventId);
      },
      error => {
        console.error(error);
      }
    );
  }
  
  searchEvents() {
    this.eventService.searchEventParent(this.term).subscribe(
      (response: any[]) => {
        this.events = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterEvents() {
    this.eventService.filterEventsParent(this.filterValue).subscribe(
      (response: any[]) => {
        this.events = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}