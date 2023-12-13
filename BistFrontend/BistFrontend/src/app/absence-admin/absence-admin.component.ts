import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbsenceService } from '../Service/absence.service';
import { Student } from '../Models/student';
import { StudentService } from '../Service/student.service';
import { Subject } from '../Models/Subject';
import { Observable } from 'rxjs';
import { SubjectService } from '../Service/SubjectService';
import { ClassService } from '../Service/class.service';
import { Class } from '../Models/Class';
@Component({
  selector: 'app-absence-admin',
  templateUrl: './absence-admin.component.html',
  styleUrls: ['./absence-admin.component.css']
})
export class AbsenceAdminComponent implements OnInit {
  absenceData: any = {};
  absenceForm: FormGroup;
  students: Student[] = [];
  subjects$!: Observable<Subject[]>;
  classes$!: Observable<Class[]>;

  //manque de classe pour permet d'afficher la liste des students de ce classe .

  constructor(private absenceService: AbsenceService, private formBuilder: FormBuilder, private cd: ChangeDetectorRef, private studentService: StudentService,
    private classService: ClassService,
    private subjectService: SubjectService) {
    this.absenceForm = this.formBuilder.group({
      // id: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      subject_id: ['', Validators.required],
      semester: ['', Validators.required],
      classe_id: ['', Validators.required],
      student_id: ['', Validators.required]
    });
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
  onSubmit() {
    if (this.absenceForm.valid) {
      const absenceData = this.absenceForm.value;

      this.absenceService.addAbsence(absenceData).subscribe(
        (response: any) => {
          console.log('Absence added:', response);
          this.absenceForm.reset();
        },
        (error) => {
          console.error('Error adding absence:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }


  // onSubmit(): void {
  //   if (this.absenceForm.valid) {
  //     const absenceData = this.absenceForm.value;
  //       const selectedSubjectId = parseInt(absenceData.subject, 10); 
  //       console.log('Selected subject ID:', selectedSubjectId);
  //       this.subjects$.subscribe(Subjects => {
  //         console.log('Fetched subjects:', Subjects);
  //         const selectedSubject = Subjects.find(subjectItem => {
  //           console.log('classItem.id:', subjectItem.id);
  //           console.log('selectedClassId:', selectedSubjectId);
  //           return subjectItem.id === selectedSubjectId;
  //         });
  //         if (selectedSubject) {

  //           absenceData.subject = selectedSubject;

  //           this.absenceService.addAbsence(absenceData).subscribe(
  //             response => {
  //               console.log('Absence added successfully:', response);
  //             },
  //             error => {
  //               console.error('Error adding absence:', error);
  //             }

  //             );
  //           } else {
  //             console.error('Selected class not found.');
  //           }
  //         });
  //       }
  //     }


  // getStudents(): void {
  //   this.studentService.getStudentss().subscribe(
  //     (data) => {
  //       this.students = data;
  //       console.log('Fetched students:', this.students);
  //     },
  //     (error) => {
  //       console.log('Error fetching students:', error);
  //     }
  //   );
  // }
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