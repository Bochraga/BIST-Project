import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../Service/note.service';
import { Student } from '../Models/student';
import { Subject } from '../Models/Subject';
import { StudentService } from '../Service/student.service';
import { Observable } from 'rxjs';
import { Class } from '../Models/Class';
import { ClassService } from '../Service/class.service';
import { SubjectService } from '../Service/SubjectService';

@Component({
  selector: 'app-note-admin',
  templateUrl: './note-admin.component.html',
  styleUrls: ['./note-admin.component.css']
})
export class NoteAdminComponent implements OnInit {
  gradeForm: FormGroup;
  students: Student[] = [];
  subjects$!: Observable<Subject[]>;
  classes$!: Observable<Class[]>;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private studentService: StudentService,
    private classService: ClassService,
    private subjectService: SubjectService
  ) {
    this.gradeForm = this.formBuilder.group({
      // id: ['', Validators.required],
      subject_id: ['', Validators.required],
      grade: ['', Validators.required],
      semester: ['', Validators.required],
      classe_id: ['', Validators.required],
      student_id: ['', Validators.required],
    });
  }
  
  onSubmit() {
    if (this.gradeForm.valid) {
      const noteData = this.gradeForm.value;

      this.noteService.addNote(noteData).subscribe(
        (response: any) => {
          console.log('Grade added:', response);
          this.gradeForm.reset();
        },
        (error) => {
          console.error('Error adding grade:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

  ngOnInit(): void {
    this.classes$ = this.classService.getClasse();

    this.classes$.subscribe(data => {
      console.log('Fetched classes:', data);
    });
    this.subjects$ = this.subjectService.getSubjects();

    this.subjects$.subscribe(data => {
      console.log('Fetched subjects:', data);
    });
  }

  onClassChange(event: any) {
    const selectedClassLevel = event.target.value;

    if (selectedClassLevel) {
      this.studentService.getStudentsByClassLevel(selectedClassLevel).subscribe(
        (students) => {
          this.students = students;
          console.log('Fetched students:', this.students);
        },
        (error) => {
          console.log('Error fetching students:', error);
        }
      );
    } else {
      this.students = [];
    }
  }
}