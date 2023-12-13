import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../Service/absence.service';
import { Observable } from 'rxjs';
import { Subject } from '../Models/Subject';
import { SubjectService } from '../Service/SubjectService';

@Component({
  selector: 'app-clasification-absence-user',
  templateUrl: './clasification-absence-user.component.html',
  styleUrls: ['./clasification-absence-user.component.css']
})
export class ClasificationAbsenceUserComponent implements OnInit {
 
  semester: string = '';
  selectedSubject: any ={ name : null }; 
  subjects$!: Observable<Subject[]>; 
  classificationAbsences: any[] = [];


  constructor(private absenceService: AbsenceService, private subjectService : SubjectService) {
    this.subjects$ = this.subjectService.getSubjects();

  }

  ngOnInit(): void {
    this.semester = '';
    this.getSubjects(); // Assuming you have a method to fetch subjects
    this.searchAbsences();
    this.loadInitialData();
  }
  getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response) => {},
      (error) => {
        console.error(error);
      }
    )
  }
  loadInitialData(): void {
    this.absenceService.getAbsencesTeacher().subscribe(
      (response) => {
        this.classificationAbsences = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchAbsences(): void {
    if (this.selectedSubject.name || this.semester) {
      const subjectName = this.selectedSubject.name;
      console.log('Subject Name:', subjectName); 
      this.absenceService
        .getClassificationAbsences(subjectName, this.semester)
        .subscribe(
          (data) => {
            this.classificationAbsences = data;
          },
          (error) => {
            console.error('Error fetching absences:', error);
          }
        );
    }
  }
}