import { Component, OnInit } from '@angular/core';
import { EventserviceService } from '../Service/eventservice.service';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../Models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: EventModel[] = [];
  term: string = '';
  filterValue: string = '';

  constructor(private eventService: EventserviceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
    }
    fetchEvents(): void {
      this.eventService.listParticipations().subscribe(
        (response: any[]) => {
          this.events = response;
        },
        error => {
          console.error(error);
        }
      );
    }
  

  searchEvents() {
    this.eventService.searchParticipationEvent(this.term).subscribe(
      (response: any[]) => {
        this.events = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterEvents() {
    this.eventService.filterParticipationEvent(this.filterValue).subscribe(
      (response: any[]) => {
        this.events = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancelParticipation(eventId: number): void {  
    
        this.eventService.cancelEventParticipation(eventId).subscribe(
      (response) => {
        console.log('Cancellation successful!', response);
        this.fetchEvents();
        this.events = this.events.filter((event) => event.id !== eventId);
      },
      (error) => {
        // Handle error, if needed
        console.error('Error occurred during cancellation:', error);
      }
    );
  }
  
  
}
