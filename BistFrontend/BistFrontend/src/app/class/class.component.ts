import { Component, OnInit } from '@angular/core';
import { ClassService } from '../Service/class.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classes: any[] = [];
  term: string = '';
  modifyForm: FormGroup;
  selectedClasses: any;
  statusData: any = { status: 'enabled' };

  constructor(private formBuilder: FormBuilder, private classService: ClassService) {
    this.modifyForm = this.formBuilder.group({
      level: [''],
      studentNbr: ['']  
    });
  }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(): void {
    this.classService.getClass().subscribe(
      (response) => {
        this.classes = response;
        console.log('Classes:', this.classes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteClass(id: number): void {
    this.classService.deleteClasses(id).subscribe(
      (response) => {
        console.log('Class deleted:', response);
        // Actualisez la liste des classes après la suppression si nécessaire
        this.getClasses();
      },
      (error) => {
        console.error('Error deleting class:', error);
      }
    );
  }

  changeStatus(id: number): void {
    this.classService.changeClassStatus(id, this.statusData).subscribe(
      (response) => {
        console.log('Class status changed:', response);
        // Actualisez la liste des classes après le changement de statut si nécessaire
        this.getClasses();
      },
      (error) => {
        console.error('Error changing class status:', error);
      }
    );
  }

  selectClasses(classes: any) {
    this.selectedClasses = classes;
    this.modifyForm.patchValue({
      level: classes.level,
      StudentNbr: classes.studentNbr,
    });
  }

  submitModifyForm() {
    if (this.selectedClasses) {
      const updatedData = this.modifyForm.value;
      this.classService.updateClass(this.selectedClasses.id, updatedData).subscribe(
        (response) => {
          console.log('Class updated:', response);
          // Actualisez la liste des classes après la modification si nécessaire
          this.getClasses();
        },
        (error) => {
          console.error('Error updating class:', error);
        }
      );
    }
  }

  searchClasses() {
    this.classService.searchClass(this.term).subscribe(
      (response) => {
        this.classes = response;
        console.log('Search Results:', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getFilteredClasses(level: string, studentNbr: number): void {
    this.classService.filterClass(level, studentNbr).subscribe(
      (response) => {
        this.classes = response;
        console.log('Filtered Classes:', response);
      },
      (error) => {
        console.error('Error filtering classes:', error);
      }
    );
  }
}










  
  