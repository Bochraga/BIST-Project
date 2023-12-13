import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/profile/edit';
  private apiUrll = 'http://127.0.0.1:8000/api/profile';
  private apiUrlll='http://127.0.0.1:8000';


  constructor(private http: HttpClient) { }
  
 
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<any>(this.apiUrll, { headers });
  }
  editProfile(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<any>(this.apiUrl , data, { headers });
  }

  uploadDocument(file: File, name: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('document', file, file.name);
    formData.append('name', name);

    return this.http.post<any>(`${this.apiUrlll}/api/document/upload`, formData, { headers });
  }

  verifyUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<any>(`${this.apiUrlll}/api/admin/verify-user/${userId}`, {}, { headers });
  }
  getUsersWithRoleUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlll}/api/users-with-role-user`);
  }
}