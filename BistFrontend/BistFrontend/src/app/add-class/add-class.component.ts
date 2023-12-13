import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../Service/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  classForm: FormGroup;
  levels: string[] = ['Level 1', 'Level 2', 'Level 3', 'Level 4']; // Add your list of levels here

  constructor(private classService: ClassService, private formBuilder: FormBuilder ,  private router: Router) {
    this.classForm = this.formBuilder.group({
      level: ['', Validators.required],
      studentNbr: ['', Validators.required],
      status: 'enabled',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      const classData = this.classForm.value; 
      this.classService.addClass(classData).subscribe(
        
        response => {
          console.log('Class added successfully:', response);
          this.router.navigate(['/getClass']);
        },
        error => {
          console.error('Error adding class:', error);
        }
      );
    }
  }
}