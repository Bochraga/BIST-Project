import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteService } from '../Service/note.service';

@Component({
  selector: 'app-list-note-admin',
  templateUrl: './list-note-admin.component.html',
  styleUrls: ['./list-note-admin.component.css']
})
export class ListNoteAdminComponent implements OnInit {
  noteList: any[] = [];
  classLevel: string = '';
  semester: string = '';
  modifyForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
    this.modifyForm = this.formBuilder.group({
      student_name: [''],
      subject: [''],
      grade: [''],
      semester: ['']
    });
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getGrades().subscribe(
      (response) => {
        this.noteList = response;
        console.log('Grades:', this.noteList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchGrades() {
    this.noteService.searchGrades(this.classLevel, this.semester)
      .subscribe(
        (data) => {
          this.noteList = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  deleteGrade(id: number): void {
    this.noteService.deleteGrades(id)
      .subscribe(
        response => {
          console.log('Grade deleted successfully:', response);
          this.loadNotes();
        },
        error => {
          console.error('Error deleting grade:', error);
        }
      );
  }

  prefillModifyForm(note: any) {
    this.modifyForm.setValue({
      student_name: note.student_name,
      subject: note.subject,
      grade: note.grade,
      semester: note.semester
    });
  }

  submitModifyForm() {
    const updatedData = this.modifyForm.value;

    this.noteService.modifyGrades(updatedData)
      .subscribe(
        (response) => {
          console.log('Grade modified successfully:', response);
          this.loadNotes();
        },
        (error) => {
          console.error('Error modifying grade:', error);
        }
      );
  }
}




