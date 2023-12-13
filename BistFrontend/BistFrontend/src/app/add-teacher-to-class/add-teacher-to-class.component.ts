import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../Service/student.service'; // Update the import
import { Class } from '../Models/Class';
import { ClassService } from '../Service/class.service';

@Component({
  selector: 'app-add-teacher-to-class',
  templateUrl: './add-teacher-to-class.component.html',
  styleUrls: ['./add-teacher-to-class.component.css']
})
export class AddTeacherToClassComponent implements OnInit {
  classes: { level: string }[] = [];
  teacherForm: FormGroup;
  teachers: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService, // Update the service injection
    private classService: ClassService // Corrected service name

  ) {
    this.teacherForm = this.formBuilder.group({
      classLevel: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClassLevels();
  }

  onSubmit() {
    console.log('Form submitted'); 
    if (this.teacherForm.valid) {
      const formData = this.teacherForm.value;
      this.classService.addTeacherToClass(formData).subscribe(
        response => {
          console.log(response.message); 
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    }
  }
  getClassLevels(): void {
    this.studentService.getClassLevels().subscribe(
      (data) => {
        console.log(data); 
        this.classes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
