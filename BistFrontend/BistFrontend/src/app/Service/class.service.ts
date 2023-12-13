import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Class } from '../Models/Class';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  addClass(classData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/AddClass`, classData, { headers });
  }
  getClass(): Observable<Class[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Class[]>(`${this.apiUrl}/api/getClasses`, { headers });
  }
  getClasses(): Observable<Class[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Class[]>(`${this.apiUrl}/api/getClasse`, { headers });
  }
  getClasse(): Observable<Class[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Class[]>(`${this.apiUrl}/api/getClass`, { headers });
  }
  searchClass(term: string): Observable<Class[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<Class[]>(`${this.apiUrl}/api/searchClasses/${term}`, { headers });
  }


  addTeacherToClass(data: any): Observable<any> {
    console.log('Adding teacher to class:', data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post(`${this.apiUrl}/api/addTeacherToClass`, data, { headers })
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }
  deleteClasses(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/DeleteClass/${id} `, { headers });

  }
  changeClassStatus(id: number, statusData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrl}/api/changeClassStatus/${id}`, statusData, { headers })
  }
  updateClass(id: number, classData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.apiUrl}/api/ModifyClass/${id}`, classData, { headers })
  }
  filterClass(level:string, studentNbr:number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
      .set('level', level)
      .set('studentNbr', studentNbr.toString());
    return this.http.get<any>(`${this.apiUrl}/api/FiltreClass`, { headers, params });
}
}