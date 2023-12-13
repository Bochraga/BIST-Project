import { Component, OnInit } from '@angular/core';
import { user } from '../Models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeacherService } from '../Service/teacher.service';
import { ClassService } from '../Service/class.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacherList: any[] = [];
  classLevel: string='';
  subjectName: string='';
  teachers: any[]=[];
  selectedStatus: { [key: number]: boolean } = {};
  searchTerm: string = '';
  filteredTeachers: user[] = [];
  modifyForm: FormGroup;
  selectedTeacher: any; 
  subjectId?: number;
  classId?: number;
  // selectedStatus: string = 'enabled';
  constructor(private formBuilder: FormBuilder,private teacherService: TeacherService, private classService:ClassService) {
    this.modifyForm = this.formBuilder.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      birthdate: [''],
      phone: [''],
      occupation: [''],
     address: [''],
      username: [''],
      nationality: ['']
      
    });
  }

  ngOnInit(): void {
    this.loadTeacher();
  }

  loadTeacher(): void {
    this.teacherService.getTeachers().subscribe(
      (response) => {
        this.teacherList = response;
        console.log('Teachers:', this.teacherList);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
 
  deleteTeacher(id:number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteteachers(id).subscribe(
        () => {
         
          this.loadTeacher();
        },
        (error) => {
          console.error('Error deleting Teacher:', error);
        }
      );
    }
  }
 

  searchTeachers() {
    this.teacherService.searchTeacher(this.searchTerm)
      .subscribe(
        (data) => {
          this.teacherList = data;
          console.log('search',this.teacherList);
          
        },
        (error) => {
          console.error(error);
        }
      );
  }

  changeTeacherStatus(teacherId: number) {
    this.teacherService.changeTeacherStatus(teacherId)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  filterTeachers(): void {
    this.teacherService.filterTeachers(this.classLevel, this.subjectName)
      .subscribe(
        response => {
          this.teachers = response;
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }
  
 prefillModifyForm(teacher: any): void {
  this.selectedTeacher = teacher;
  
  this.modifyForm.setValue({
    email: teacher.email,
    password: teacher.password,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    birthdate: teacher.birthdate,
    phone: teacher.phone,
    occupation: teacher.occupation,
    address: teacher.address,
    username: teacher.username,
    nationality:teacher.nationality 
   
  });
}

submitModifyForm() {
  const id = this.selectedTeacher.id;
  const teacherData = this.modifyForm.value;

  this.teacherService.modifyTeachers(id, teacherData).subscribe(
    (response) => {
      console.log('Teacher modified successfully:', response);
      this.loadTeacher();
    },
    (error) => {
      console.error('Error modifying grade:', error);
    }
  );
}

}
