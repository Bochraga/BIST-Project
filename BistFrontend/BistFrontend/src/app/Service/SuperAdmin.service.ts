import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../Models/Subject';


@Injectable({
  providedIn: 'root'
})

 
export class SuperAdminService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  registerAdmin(data:any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/registerNewAdmin`, data, { headers });
}
deleteAdmin(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete(`${this.apiUrl}/api/deleteAdmin/${id} `, { headers });
}

editAdmin(id: number, data: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  
  return this.http.put(`${this.apiUrl}/api/editAdmin/${id}`, data, { headers });
}

listAdmins(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/api/listAdmins`, { headers });
}

searchAdmin(term: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/api/searchAdmin/${term}`, { headers });
}

changeAdminStatus(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  });
  return this.http.get(`${this.apiUrl}/api/ChangeStatusAdmin/${id}`, { headers });
}
}