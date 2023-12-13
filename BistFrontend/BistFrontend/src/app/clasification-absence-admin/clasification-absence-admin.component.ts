import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../Service/absence.service';
import { Observable } from 'rxjs';
import { Subject } from '../Models/Subject';
import { SubjectService } from '../Service/SubjectService';

@Component({
  selector: 'app-clasification-absence-admin',
  templateUrl: './clasification-absence-admin.component.html',
  styleUrls: ['./clasification-absence-admin.component.css']
})
export class ClasificationAbsenceAdminComponent implements OnInit {

  semester: string = '';
  selectedSubject: any ={ name : null }; 
  subjects$!: Observable<Subject[]>; 
  classificationAbsences: any[] = [];


  constructor(private absenceService: AbsenceService, private subjectService : SubjectService) {
    this.subjects$ = this.subjectService.getSubjects();

  }

  ngOnInit(): void {
    this.semester = '';
    this.getSubjects(); 
    this.searchAbsences();
    this.loadInitialData();
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
  getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response) => {},
      (error) => {
        console.error(error);
      }
    )
  }
  getClassificationAbsencesTeacher(): void {
    if (this.selectedSubject.name && this.semester) {
      const subjectName = this.selectedSubject.name;
      console.log('Subject Name:', subjectName); 
      this.absenceService
        .getClassificationAbsences(subjectName, this.semester)
          .subscribe(
            (response) => {
              this.classificationAbsences = response;
            },
            (error) => {
              console.error(error);
            }
          );
      }
    }
  
  searchAbsences(): void {
    this.getClassificationAbsencesTeacher();
  }
  
}

