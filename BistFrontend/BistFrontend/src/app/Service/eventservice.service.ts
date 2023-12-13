import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../Models/event';

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {
  private searchUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  listEvent(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.searchUrl}/api/listEvents`, { headers });
  }
  postEvent(eventData: EventModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(`${this.searchUrl}/api/postEvent`, eventData, { headers });
  }

  getEventsall(): Observable<EventModel[]> {
  
    return this.http.get<EventModel[]>(`${this.searchUrl}/listEventspublic`);
  }

  getEventsAdmin(): Observable<EventModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<EventModel[]>(`${this.searchUrl}/api/listEvents`, { headers });
  }
  searchEvent(term: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<any>(`${this.searchUrl}/api/searchEvent/${term}`, { headers });
}
filterEvents(filterValue: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }); ;
  return this.http.get<any>(`${this.searchUrl}/api/filterEvents/${filterValue}`, { headers });
}
changeEventStatus(eventId: number, status: boolean): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  const statusValue = status ? '1' : '0';

  return this.http.put<any>(`${this.searchUrl}/api/changeEventStatus/${eventId}/${statusValue}`, {}, { headers });
}
getEvents(): Observable<any> {
  const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  return this.http.get<any[]>(`${this.searchUrl}/api/getEvents`, { headers });
}

participateEvent(eventId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<any>(`${this.searchUrl}/api/participateEvent/${eventId}`, null, { headers });
}
 
  cancelEventParticipation(eventId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.searchUrl}/api/cancelEventParticipation/${eventId}`, null, { headers })
  }
listParticipations(): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.searchUrl}/api/listParticipation`, { headers });
}
searchParticipationEvent(term: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  return this.http.get<any>(`${this.searchUrl}/api/searchParticipationEvent/${term}`, { headers });
}
filterParticipationEvent(filterValue: string): Observable<any> {
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}); ;
return this.http.get<any>(`${this.searchUrl}/api/filterParticipation/${filterValue}`, { headers });
}
filterEventsParent(filterValue: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }); ;
  return this.http.get<any>(`${this.searchUrl}/api/filterEventsParent/${filterValue}`, { headers });
  }
  searchEventParent(term: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    return this.http.get<any>(`${this.searchUrl}/api/searchEventParent/${term}`, { headers });
  }

  deleteEvent(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.searchUrl}/api/deleteEvent/${id}`,{headers});
  }
  editEventDetails(id: number, eventData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<void>(`${this.searchUrl}/api/editEvent/${id}`,eventData,{headers});
  }

}
