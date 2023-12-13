import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../Service/complaint.service';
import { complaint } from '../Models/complaint';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent {
complaintData: complaint = {};

constructor(private complaintService: ComplaintService) {}

submitComplaint(): void {
  this.complaintService.postComplaint(this.complaintData).subscribe(
    (response) => {
      console.log(response); 
    },
    (error) => {
      console.log(error); 
    }
  );
}


}
