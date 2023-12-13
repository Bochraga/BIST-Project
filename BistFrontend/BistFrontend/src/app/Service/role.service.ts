import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { role } from '../Models/role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:8000/roles' ; 
  private userRole: role[] = [];

  constructor(private http: HttpClient) { }

  getRoles(): Observable<role[]> {
  return this.http.get<any[]>(this.apiUrl);
  }

  setUserRole(roles: role[]): void {
    this.userRole = roles;
  }

  getUserRole(): role[] {
    return this.userRole;
  }
  
}