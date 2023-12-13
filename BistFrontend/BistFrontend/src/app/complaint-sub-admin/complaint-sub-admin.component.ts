import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../Service/complaint.service';

@Component({
  selector: 'app-complaint-sub-admin',
  templateUrl: './complaint-sub-admin.component.html',
  styleUrls: ['./complaint-sub-admin.component.css']
})
export class ComplaintSubAdminComponent implements OnInit {
  complaints: any[] = [];
  statusOptions: string[] = ['sent', 'in progress', 'treated'];

  constructor(private http: HttpClient , private complaintService: ComplaintService ) { }

  ngOnInit(): void {
    this.getComplaints();
  }
  getComplaints() {
    this.http.get('http://127.0.0.1:8000/api/getComplaints').subscribe(
      (response: any) => {
        this.complaints = response;
            },
      (error: any) => {
        console.error(error);
      }
    );
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
  enableEditMode(complaint: any): void {
    complaint.editMode = true;
  }

  disableEditMode(complaint: any): void {
    complaint.editMode = false;
    this.updateStatus(complaint);
  }

  updateStatus(complaint: any): void {
    this.complaintService.editComplaint(complaint.id, complaint.status)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
  }
}
