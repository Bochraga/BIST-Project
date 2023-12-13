import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Service/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  term: string = '';
  filterValue:string='';
  students: any[] = [];
  class: string = ''; 
  filterValuee: number | undefined; // Define the enrollmentYear property here
  selectedStudent: any;
  modifyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private studentService: StudentService) { 
this.modifyForm = this.formBuilder.group({
  fullName: [''],
  gender: [''],
  birthdate: [''],
  enrollmentYear: [''],
});

}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe(
      response => {
        this.students = response;
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }
  
  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        this.fetchStudents();
      },
      error => {
        console.error('Error deleting student:', error);
      }
    );
  }
  editStudent() {
    if (this.selectedStudent) {
      const updatedData = this.modifyForm.value;
        this.studentService.editStudent(this.selectedStudent.id, updatedData).subscribe(
          (response) => {
            console.log('SubAdmin details updated successfully', response);
            this.selectedStudent= null;
             this.fetchStudents();
      },
      error => {
        console.error(error);
      }
    );
  }}
  selectStudent(student: any) {
    this.selectedStudent = student;
    this.modifyForm.patchValue({
      fullName :student.FullName ,
      gender:student.Gender ,
      birthdate:student.Birthdate, 
     enrollmentyear:student.EnrollmentYear 
    });
  }
 

  filterStudents(enrollmentYear: number | undefined): void {
    if (enrollmentYear !== undefined) {
      this.studentService.filterStudentsByEnrollmentYear(enrollmentYear).subscribe(
        response => {
          this.students = response;
        },
        error => {
          console.error('Error filtering students:', error);
        }
      );
    }
  }

  searchStudents(): void {
    this.studentService.searchStudentsByFullName(this.term).subscribe(
      response => {
        this.students = response;
      },
      error => {
        console.error('Error searching students:', error);
      }
    );
  }


}