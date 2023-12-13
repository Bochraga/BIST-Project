import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../Service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  userList: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.userList = [];
    this.studentForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      class: ['', Validators.required],
      enrollementYear: ['', Validators.required],
      parent: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.fetchUserList();    
  }

  fetchUserList() {
    this.studentService.getUsersWithRoleUser().subscribe(
      (response: any[]) => {
        this.userList = response;
      },
      (error) => {
        console.error('Error fetching user list:', error);
      }
    );
  }
  
  onSubmit() {
    const formData = this.studentForm.value;
    const selectedUserId = formData.parent; 
    this.studentService.affectPupilToParent(selectedUserId, formData).subscribe(
      (response) => {
        console.log('Pupil affected to parent successfully:', response);
        this.router.navigate(['/listStudent']);

      },
      (error) => {
        console.error('Error affecting pupil to parent:', error);
      }
    );
  }
}