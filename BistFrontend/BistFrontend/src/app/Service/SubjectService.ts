import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../Models/Subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  addSubject(subjectData: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiUrl}api/postSubject`, subjectData);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}api/getSubjectsTeacher`);
  }
  getSubject(): Observable<Subject[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Subject[]>(`${this.apiUrl}api/getSubjectAdmin`,{headers});
  }
  getSubjectUser(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}api/getSubject`);
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/deleteSubject/${id}`);
  }

  changeSubjectStatus(id: number, status: boolean): Observable<void> {
    const body = { id: id, status: status };
    return this.http.patch<void>(`${this.apiUrl}api/changeSubjectStatus/${id}/${status}`, body);
  }

  searchSubjects(term: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}api/searchSubjects/${term}`);
  }
  filterSubjects(coefficient: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}api/filterSubjects/${coefficient}`);
  }
  updateSubject(id: number,subjectData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch<void>(`${this.apiUrl}api/ModifySubject/${id}`,subjectData,{headers});
  }
}
