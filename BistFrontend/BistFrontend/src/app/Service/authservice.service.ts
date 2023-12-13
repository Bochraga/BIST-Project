import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { role } from '../Models/role';
import { tap } from 'rxjs/operators'; 
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the 'map' operator

const AUTH_API = 'http://127.0.0.1:8000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private user: any;
  isLoggedIn = false; // Change the property name to 'isLoggedIn'
  private userId: string = '';
  private userToken: string = '';
  private connectedUserName: string = '';
  private userRole: string = ''; // Add a new private property to store the user's role

  private userRoleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userRole$: Observable<string> = this.userRoleSubject.asObservable();
  constructor(private http: HttpClient) {
   // this.updateUserRole(this.user.roles);

   this.user = {
    username: '',
    roles: [] // Initialize roles as an empty array
  
  };
   }
   /*
  isAdmin(): Observable<boolean> {
    // Return an Observable that emits true if the user has the admin role; otherwise, emits false.
    return this.userRoleSubject.asObservable().pipe(
      map((roles: string[]) => {
        return roles.includes('ROLE_ADMIN');
      })
    );
  }
  */
  /*
  private updateUserRole(roles: string[]): void {
    this.userRoleSubject.next(roles);
  }
  */
  getUserRole(): string {
    if (this.user?.roles && this.user.roles.length > 0) {
      const roleOtherThanUser = this.user.roles.find((role: string) => role !== 'ROLE_USER');
      if (roleOtherThanUser) {
        return roleOtherThanUser;
      }
    }

    return 'ROLE_USER';
  }

  register(
    firstName: string,
    lastName: string,
    username: string,
    occupation: string,
    address: string,
    nationality: string,
    email: string,
    phone: number,
    birthdate: Date,
    password: string,
    roleId: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + '/registration',
      {
        firstName,
        lastName,
        username,
        occupation,
        address,
        nationality,
        email,
        phone,
        birthdate,
        password,
        role: roleId, 
      },
      httpOptions
    );
  }
  registerSimpleUser(
    firstName: string,
    lastName: string,
    username: string,
    occupation: string,
    address: string,
    nationality: string,
    email: string,
    phone: number,
    birthdate: Date,
    password: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + '/registrationSimpeUser',
      {
        firstName,
        lastName,
        username,
        occupation,
        address,
        nationality,
        email,
        phone,
        birthdate,
        password
      },
      httpOptions
    );
  }

  login(username: string, password: string) {
    const loginData = { username, password };
    return this.http.post<any>(AUTH_API + '/login/token', loginData, httpOptions).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.isLoggedIn = true;

        this.getUserDetails(response.token).subscribe((userDetails) => {
          console.log('User Details Response:', userDetails);
          this.user = userDetails;
          this.userRole = this.getUserRoleFromRoles(userDetails.roles); 
          this.userRoleSubject.next(this.userRole); 
          this.connectedUserName = this.user.username; 
          localStorage.setItem('userRole', this.userRole);
        });
      })
    );
  }
  private getUserRoleFromRoles(roles: string[]): string {
   if (this.user?.roles && this.user.roles.length > 0) {
    const roleOtherThanUser = this.user.roles.find((role: string) => role !== 'ROLE_USER');
    if (roleOtherThanUser) {
      return roleOtherThanUser;
    }
  }

  return 'ROLE_USER';
}


  private getUserDetails(token: string): Observable<any> {
   
    return this.http.get<any>(AUTH_API + '/api/userDetailsApiEndpoint', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      tap((response) => {
        console.log('User Details Response:', response);
        this.user = {
          username: response.username,
          roles: response.roles
        };
        this.setUserRole(this.user.roles);
      })
    );
  }

  private setUserRole(roles: string[]): void {
    if (roles && roles.length > 0) {
      const hasUserRole = roles.includes('ROLE_USER');
      if (hasUserRole) {
        const roleOtherThanUser = roles.find((role: string) => role !== 'ROLE_USER');
        if (roleOtherThanUser) {
          this.userRole = roleOtherThanUser;
          return;
        }
      }
    }
  
    this.userRole = '';
  }
  
  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserToken(userToken: string): void {
    this.userToken = userToken;
  }

  getUserToken(): string {
    return this.userToken;
  }
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const expirationTime = decodedToken.exp * 1000; 
      const currentTime = new Date().getTime();
      return currentTime > expirationTime;
    }
    return true;
  }

 
  setConnectedUserName(username: string): void {
    this.connectedUserName = username;
  }

  getConnectedUserName(): string {
    return this.connectedUserName;
  }
  logout(): void {
    localStorage.removeItem('token'); 
   
  }
  
}
