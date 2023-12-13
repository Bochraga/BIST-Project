import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../Models/Subject';


@Injectable({
  providedIn: 'root'
})

 
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  registerAdmin(data:any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/registerNewSubAdmin`, data, { headers });
}
deleteAdmin(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete(`${this.apiUrl}/api/deleteSubAdmin/${id} `, { headers });
}

editAdmin(id: number, data: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  
  return this.http.put(`${this.apiUrl}/api/editSubAdmin/${id}`, data, { headers });
}

listAdmins(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/api/listSubAdmins`, { headers });
}

searchAdmin(term: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/api/searchSubAdmin/${term}`, { headers });
}

changeAdminStatus(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  });
  return this.http.get(`${this.apiUrl}/api/ChangeStatusSubAdmin/${id}`, { headers });
}
}