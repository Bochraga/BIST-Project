import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../Models/student';
import { Class } from '../Models/Class';
import { StudentService } from '../Service/student.service';
import { ClassService } from '../Service/class.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentForm: FormGroup;
  students: Student[] = []; // Assuming you have a Student model
  class: Class[] =[];
  constructor(private studentService: StudentService,private formBuilder: FormBuilder,private classService:ClassService) {
    this.studentForm = this.formBuilder.group({
      student_id: ['', Validators.required],
      class_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getStudents();
    this.getClasses();
  }

  getStudents(): void {
    // Call a service method to fetch the list of students
    this.studentService.getStudents().subscribe(
      (response) => {
        this.students = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getClasses():void{
    this.classService.getClasses().subscribe(
      (response) => {
        this.class = response;
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      this.studentService.addStudentToClass(formData).subscribe(
        (response) => {
          console.log('Student added to class:', response);
          // Refresh the list of students after successful addition
          this.getStudents();
        },
        (error) => {
          console.error('Error adding student to class:', error);
        }
      );
    }
  }
}