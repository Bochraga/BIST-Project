import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://127.0.0.1:8000';

  // constructor() { }
  constructor(private http: HttpClient) { }
  addTeacher(teacherData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/AddTeacher`, teacherData, { headers });
}
getTeachers(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/api/getTeacher`, { headers });
}
modifyTeachers(id: number, teacherData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.patch(`${this.apiUrl}/api/ModifyTeacher/${id}`, teacherData, { headers });
}

deleteteachers(id: number): Observable<void> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  });
  return this.http.delete<void>(`${this.apiUrl}/api/deleteTeacher/${id} `, {headers });

}
searchTeacher(term: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  });

  return this.http.get<any>(`${this.apiUrl}/api/searchTeacher/${term}`, { headers });
}
changeTeacherStatus(teacherId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  });
  return this.http.get(`${this.apiUrl}/api/ChangeStatusTeacher/${teacherId}`, { headers });
}

filterTeachers(classLevel: string, subjectName: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer${token}`
  });
  const params = {
    level: classLevel,
    name: subjectName
  };
  return this.http.get(`${this.apiUrl}/api/filter_teachers`, { headers, params });
}

}
