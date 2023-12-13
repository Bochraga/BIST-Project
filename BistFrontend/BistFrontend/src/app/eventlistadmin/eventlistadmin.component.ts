import { Component, OnInit } from '@angular/core';
import { EventserviceService } from '../Service/eventservice.service';
import { EventModel } from '../Models/event';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eventlistadmin',
  templateUrl: './eventlistadmin.component.html',
  styleUrls: ['./eventlistadmin.component.css'],
  
})
export class EventlistadminComponent implements OnInit {
  events: EventModel[] = [];
  filterValue: string = '';
  searchTerm: string = '';
  modifyForm: FormGroup;
  selectedEvent:any;
  constructor(private formBuilder: FormBuilder,private eventService: EventserviceService) {
    this.modifyForm = this.formBuilder.group({
      title: [''],
      description: [''],
      date: [''],
      hour: [''],
      place: [''],
      nbParticipant: ['']
    });
  
   }

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


  searchEvents(): void {
      if (this.searchTerm) {
        this.eventService.searchEvent(this.searchTerm).subscribe(

            response => {
              console.log(response);
              this.events = response;
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.fetchEvents(); 
      }
  }
  filterEvents(): void {
  if (this.filterValue) {
    this.eventService.filterEvents(this.filterValue).subscribe(

        response => {
          console.log(response);
          this.events = response;
        },
        error => {
          console.error(error);
        }
      );
  } else {
    this.fetchEvents(); 
  }
}
deleteEvent(eventId: number): void {
  if (confirm('Are you sure you want to delete this event?')) {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        console.log('Event deleted successfully.');
        this.fetchEvents();
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }
}
selectEvent(event: any) {
  this.selectedEvent = event;
  this.modifyForm.patchValue({
    title: event.title,
    description: event.description,
    date: event.date,
    hour: event.hour,
    place: event.place,
    nbParticipant: event.nbParticipant
  });
}
submitModifyForm() {
  if (this.selectedEvent) {
    const updatedData = this.modifyForm.value;

    this.eventService.editEventDetails(this.selectedEvent.id, updatedData).subscribe(
      (response) => {
        console.log('Event modified successfully:', response);
        this.fetchEvents();
        this.selectedEvent = null; 
      },
      (error) => {
        console.error('Error modifying event:', error);
      }
    );
  }
}

changeEventStatus(eventId: number, status: boolean): void {
  this.eventService.changeEventStatus(eventId, status).subscribe(
    response => {
      console.log('Event status updated:', response);
      this.fetchEvents(); // Retrieve the updated list of events
    },
    error => {
      console.error(error);
    }
  );
}


}
