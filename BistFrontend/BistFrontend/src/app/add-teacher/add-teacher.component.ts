import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../Service/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from '../Models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  newTeacher: user = new user();

  constructor( private formBuilder: FormBuilder,private teacherService: TeacherService, private router: Router) {
  }

  ngOnInit(): void {
  }
  addTeacher(): void {
    this.teacherService.addTeacher(this.newTeacher).subscribe(() => {
      this.newTeacher= new user();
      this.router.navigate(['/ListTeacher']);
    });
  }

}
