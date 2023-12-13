import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoteService } from '../Service/note.service';
import { Subject } from '../Models/Subject';
import { Observable } from 'rxjs';
import { SubjectService } from '../Service/SubjectService';

@Component({
  selector: 'app-clasification-note-user',
  templateUrl: './clasification-note-user.component.html',
  styleUrls: ['./clasification-note-user.component.css']
})
export class ClasificationNoteUserComponent implements OnInit {
  classificationNotes: any[] = [];
  gradeList: any[] = [];
  semester: string = '';
  selectedSubject: any; // Define selectedSubject property
  subjects$!: Observable<Subject[]>; // Define subjects$ property

  constructor(private noteService: NoteService, private subjectService : SubjectService) {
    this.subjects$ = this.subjectService.getSubjectUser();

  }

  ngOnInit(): void {
    this.semester = '';
    this.getSubjects(); // Assuming you have a method to fetch subjects
    this.searchNotes();
    this.loadInitialData();

  }
  loadInitialData(): void {
    this.noteService.getGradesForUser().subscribe(
      (response) => {
        this.classificationNotes = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSubjects(): void {
    this.subjectService.getSubjectUser().subscribe(
      (response) => {},
      (error) => {
        console.error(error);
      }
    )
  }
 getClassificationNotes(): void {
  if (this.selectedSubject && (this.selectedSubject.name || this.semester)) {
    const GradeStudent = this.selectedSubject.name;
    console.log(' Subject :', GradeStudent); 
    this.noteService
      .getClassificationGradesParent(GradeStudent, this.semester)
      .subscribe(
        (response) => {
          this.classificationNotes = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}

  

  // getClassificationNotes(): void {
  //   const subjectName = this.selectedSubject?.name; 

  //   if (subjectName) {
  //     this.noteService.getClassificationGradesParent(subjectName, this.semester)
  //       .subscribe(
  //         (response: any[]) => {
  //           this.classificationNotes = response;
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //   }
  // }

  searchNotes(): void {
    this.getClassificationNotes();
  }
}
