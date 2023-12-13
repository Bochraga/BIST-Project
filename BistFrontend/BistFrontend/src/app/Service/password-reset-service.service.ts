import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PasswordResetServiceService {
  private RESET_PASSWORD_API = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) {}

  sendResetEmail(email: string): Observable<any> {
    const resetLink = `${this.RESET_PASSWORD_API}/forgot-password`; 
    const body = { email, resetLink }; 

    return this.http.post(
      resetLink,
      body,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  resetUserPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.RESET_PASSWORD_API}/reset-password/${token}`,
      { password: newPassword },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
