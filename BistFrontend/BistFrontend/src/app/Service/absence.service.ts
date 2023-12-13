import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../Models/Subject';


@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  addAbsence(absenceData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/AddAbsence`, absenceData, { headers });
  }

  getAbsences(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/getAbsence`, { headers });
  }
  getAbsencesTeacher(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/getAbsenceTeacher`, { headers });
  }
  getAbsencesParent(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/getAbsenceParent`, { headers });
  }
  getClassificationAbsences(subject: Subject, semester: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const subjectName = subject.name;
    const params = new HttpParams()
      .set('name', subjectName)
      .set('semester', semester);
    return this.http.get<any>(`${this.apiUrl}/api/ClasifcationAbsence`, { headers, params });
  }
  getClassificationAbsencesParent(subject: Subject, semester: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const subjectName = subject.name;
    const params = new HttpParams()
      .set('name', subjectName)
      .set('semester', semester);
    return this.http.get<any>(`${this.apiUrl}/api/ClasifcationAbsenceParent`, { headers, params });
  }
  modifyAbsences(id: number, updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.patch(`${this.apiUrl}/api/ModifyAbsence/${id}`, updatedData, { headers });
  }
  
  deleteAbsences(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/api/DeleteAbsence/${id} `, {headers });

  }
  searchAbsence(date: string, classe: string, semester: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`
    });
    const params = new HttpParams()
      .set('date', date)
      .set('classe',classe)
      .set('semester', semester);
    return this.http.get<any>(`${this.apiUrl}/api/searchAbsences`, { headers, params });
  }
}