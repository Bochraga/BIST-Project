import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { complaint } from '../Models/complaint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = 'http://127.0.0.1:8000'; 
  private searchUrl = 'http://127.0.0.1:8000/api/searchComplaints';


  constructor(private http: HttpClient) {}

  postComplaint(complaintData: complaint): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(`${this.apiUrl}/api/postComplaint`, complaintData, { headers });
  }

  getComplaints(): Observable<complaint[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<complaint[]>(`${this.apiUrl}/api/getComplaintsByUserId`, { headers });
  }

  searchComplaints(term: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<any>(`${this.searchUrl}/${term}`, { headers });
  }

  editComplaint(complaintId: number, newStatus: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    return this.http.patch<any>(`${this.apiUrl}/api/editAComplaint/${complaintId}/${newStatus}`, {}, { headers })
      .pipe(
        map(response => response.data) 
      );
  }
}