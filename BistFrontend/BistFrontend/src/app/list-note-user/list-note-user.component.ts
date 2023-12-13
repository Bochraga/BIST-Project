import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoteService } from '../Service/note.service';

@Component({
  selector: 'app-list-note-user',
  templateUrl: './list-note-user.component.html',
  styleUrls: ['./list-note-user.component.css']
})
export class ListNoteUserComponent implements OnInit {

  noteList: any[] = [];
  constructor(private formBuilder: FormBuilder, private noteService : NoteService)
  {}

  ngOnInit(): void {
    this.loadNotes();
  }
  
  loadNotes() {
    this.noteService.getGradesForUser().subscribe(
      (response) => {
        this.noteList = response;
        console.log('Grades:', this.noteList);
      },
      (error) => {
        console.error('Error fetching grades:', error);
      }
    );
  }
}
