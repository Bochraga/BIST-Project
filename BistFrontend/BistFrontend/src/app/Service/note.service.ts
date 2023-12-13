import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from '../Models/Subject';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

addNote(noteData: any):Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/AddGrade`, noteData, {headers});
  }

  getGrades():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/getGradesTeacher`,{headers});
  }

  getClassificationGrades(classId: string, semester: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const endpoint = `${this.apiUrl}/api/searchGrades`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams()
      .set('classLevel', classId)
      .set('semestre', semester);

    return this.http.get<any[]>(endpoint, { headers, params });
  }

  

  //ParentSpace

  getGradesForUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/getGradesParent`, { headers });
  }
  
  
  
  getClassificationGradesParent(subject: Subject, semester: string): Observable<any[]> {
    const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const subjectName = subject.name;
    const params = new HttpParams()
      .set('name', subjectName)
      .set('semester', semester);

    return this.http.get<any[]>(`${this.apiUrl}/api/ClasifcationGradeParent`, { params , headers });

}
searchGrades(classLevel: string, semestre: string): Observable<any> {
  const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  const params = {
    classLevel: classLevel,
    semestre: semestre,
  };
  return this.http.get(`${this.apiUrl}/api/searchGrades`, { params , headers });
}
modifyGrades(id:number):Observable<any>{
  const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.patch(`${this.apiUrl}/api/ModifyGrade/${id}`, { headers });
    }
    deleteGrades(id: number):Observable<void>{
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization' :`Bearer${token}`});
        return this.http.delete<void>(`${this.apiUrl}/api/DeleteGrade/${id}`);

    }
}