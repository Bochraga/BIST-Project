import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

 
private apiUrl = 'http://127.0.0.1:8000';

// constructor() { }
constructor(private http: HttpClient) { }

addAdmission(admissionData: any) {
 return this.http.post(`${this.apiUrl}/postAdmission`, admissionData);}

     getAdmissions(): Observable<any> {
     const token = localStorage.getItem('token');
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     });
     
 return this.http.get<any>(`${this.apiUrl}/api/getAdmissions`, { headers });
   }
   
   editAdmission(id: number, status: string): Observable<any> {
     const token = localStorage.getItem('token');
     const body = { status };
   
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token 
    });
 
 return this.http.patch<any>(`${this.apiUrl}/api/editAdmission/${id}`, body, { headers });
 }
 searchAdmission(term: string): Observable<any> {
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem('token')
   });
 
   return this.http.get<any>(`${this.apiUrl}/api/searchAdmission/${term}`, { headers });
 }
filterAdmission(status: string): Observable<any> {
 const headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + localStorage.getItem('token')
 }); 
 return this.http.get<any>(`${this.apiUrl}/api/filterAdmission/${status}`, { headers });
 }
 
 BlockDate(id: number, blockDate: string): Observable<any> {
   const token = localStorage.getItem('token');
   const body = {blockDate};
 
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token 
  });

return this.http.patch<any>(`${this.apiUrl}/api/BlockAdmissionVisit/${id}`, body, { headers });
}
}



