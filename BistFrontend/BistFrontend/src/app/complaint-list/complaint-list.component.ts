import { Component, OnInit } from '@angular/core';
import { complaint } from '../Models/complaint';
import { ComplaintService } from '../Service/complaint.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthserviceService } from '../Service/authservice.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  complaints: any[] = [];
  filteredComplaints: any[] = [];
  searchTerm: string = '';

  error: string = '';

  constructor(private http: HttpClient , private complaintService: ComplaintService , private authService: AuthserviceService) { }

  ngOnInit(): void {
    this.fetchAdmissions();
  }

  getComplaints(): void {
   
    this.http.get<any[]>('http://127.0.0.1:8000/api/getComplaintsByUserId').subscribe(
      response => {
        this.complaints = response;
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
      }
    );
  }

  filterComplaints(status: string): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/filterComplaints/${status}`).subscribe(
     response => {
      this.complaints = response;
    },
    (error: HttpErrorResponse) => {
      this.error = error.message;
    }
  );
  }
  fetchAdmissions() {
    this.complaintService.getComplaints()
      .subscribe(
        response => {
          console.log(response); 
          this.complaints = response; 
        },
        error => {
          console.error(error); 
        }
      );
  }

  searchComplaints() {
    if (this.searchTerm) {
      this.complaintService.searchComplaints(this.searchTerm)
        .subscribe(
          response => {
            console.log(response);
            this.complaints = response; 
          },
          error => {
            console.error(error);
          }
        );
    } else {
      this.fetchAdmissions(); 
    }
  }

  editComplaint(complaintId: number, newStatus: string): void {
    this.complaintService.editComplaint(complaintId, newStatus)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
  }
  updateStatus(complaint: any): void {
    const newStatus = prompt('Enter the new status:');
    if (newStatus) {
      this.complaintService.editComplaint(complaint.id, newStatus)
        .subscribe(
          response => {
            console.log(response);
            complaint.status = newStatus; 
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  
}
