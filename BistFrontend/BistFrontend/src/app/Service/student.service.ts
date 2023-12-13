import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Student } from '../Models/student';
import { Class } from '../Models/Class';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}
  
  addStudentToClass(formData: any): Observable<Student> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Student>(
      `${this.apiUrl}/api/AddStudentToClass`,
      formData,
      { headers }
    );
  }

  getStudents(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Student[]>(`${this.apiUrl}/api/getStudents`, { headers});
  }

  getUsersWithRoleUser(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/users-with-role-user`, { headers});
  }
  getStudentss(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Student[]>(`${this.apiUrl}/api/getStudentss`,{ headers});
  }
  getStudentsByClassLevel(level: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/getStudentsByClassLevel/${level}`, { headers});

  }
  affectPupilToParent(idUser: number, formData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${this.apiUrl}/api/affectPupilToParent/${idUser}`,
      formData,
      { headers }
    );
  }

 
  searchStudents(term: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/searchStudents/${term}`,{headers});

  }
  filterStudents(filterValue: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/filterStudents/${filterValue}`,{headers});

  }
  getClassLevels(): Observable<Class[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Class[]>(`${this.apiUrl}/api/getClassLevels`,{headers});
  }

  deleteStudent(studentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<any>(
      `${this.apiUrl}/api/deleteStudent/${studentId}`,
      { headers }
    );
  }

  editStudent(id: number, studentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<void>(`${this.apiUrl}/api/editStudent/${id}`,studentData,{headers});
  }

 
  filterStudentsByEnrollmentYear(enrollmentYear: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `${this.apiUrl}/api/filterStudentsByEnrollmentYear/${enrollmentYear}`,
      { headers }
    );
  }


  searchStudentsByFullName(term: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<any>(
      `${this.apiUrl}/api/searchStudents/${term}`,
      { headers }
    );
  }

}