import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClassService } from '../Service/class.service';
import { NoteService } from '../Service/note.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clasification-note-admin',
  templateUrl: './clasification-note-admin.component.html',
  styleUrls: ['./clasification-note-admin.component.css']
})
export class ClasificationNoteAdminComponent implements OnInit {
  classificationNotes: any[] = [];
  semestre: string = '';
  selectedClass: any = { level: null }; 
  classes$: Observable<any[]>;

  constructor(
    private noteService: NoteService,
    private classService: ClassService
  ) {
    this.classes$ = this.classService.getClasse();
  }

  ngOnInit(): void {
    this.semestre = '';
    this.getClasses();
    this.searchNotes();
    this.loadInitialData();

  }
  loadInitialData(): void {
    this.noteService.getGrades().subscribe(
      (response) => {
        this.classificationNotes = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getClasses(): void {
    this.classService.getClasse().subscribe(
      (response) => {},
      (error) => {
        console.error(error);
      }
    );
  }
  

  getClassificationNotesTeacher(): void {
    if (this.selectedClass.Level && this.semestre) {
      const classLevel = this.selectedClass.Level.toString();
      console.log('Class Level:', classLevel); 
      this.noteService
        .getClassificationGrades(classLevel, this.semestre)
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
  
  searchNotes(): void {
    this.getClassificationNotesTeacher();
  }
}