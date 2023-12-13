import { Component, OnInit } from '@angular/core';
import { Class } from '../Models/Class';
import { StudentService } from '../Service/student.service';


@Component({
  selector: 'app-list-student-class',
  templateUrl: './list-student-class.component.html',
  styleUrls: ['./list-student-class.component.css']
})
export class ListStudentClassComponent implements OnInit {
  term: string = '';
  filterValue: string = '';
  students: any[] = [];
  level: string = '';
  classLevels: Class[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getClassLevels(); 
    this.getStudentsBySelectedLevel();

    
  }

  getStudentsBySelectedLevel(): void {
    if (this.level) {
      this.studentService.getStudentsByClassLevel(this.level).subscribe(
        (data) => {
          this.students = data;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.students = [];
    }
  }

  getClassLevels(): void {
    this.studentService.getClassLevels().subscribe(
      (data) => {
        this.classLevels = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchStudents(): void {
    if (this.term.trim() !== '') {
      this.studentService.searchStudents(this.term).subscribe(
        (response) => {
          this.students = response;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.getStudentsBySelectedLevel(); // Refresh the student list if the search term is empty
    }
  }

  filterStudents(): void {
    if (this.filterValue.trim() !== '') {
      this.studentService.filterStudents(this.filterValue).subscribe(
        (response) => {
          this.students = response;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.getStudentsBySelectedLevel(); // Refresh the student list if the filter value is empty
    }
  }
}