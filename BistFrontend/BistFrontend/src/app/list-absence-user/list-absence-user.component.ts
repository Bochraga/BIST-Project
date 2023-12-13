import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../Service/absence.service';

@Component({
  selector: 'app-list-absence-user',
  templateUrl: './list-absence-user.component.html',
  styleUrls: ['./list-absence-user.component.css']
})
export class ListAbsenceUserComponent implements OnInit {

  absences: any[] = [];
  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.getAbsencesParent();
  }

  getAbsencesParent(): void {
    this.absenceService.getAbsencesParent().subscribe(
      (response) => {
        this.absences=response;
        console.log('Absence:', this.absences);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
