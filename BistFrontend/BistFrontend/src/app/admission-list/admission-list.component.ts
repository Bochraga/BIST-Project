import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router'
import { Admission } from '../Models/admission';
import { AdmissionService } from '../Service/admission.service';

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.css', './admission-list.component.css']
})


export class AdmissionListComponent implements OnInit {
  isAdminLoggedIn: boolean = false;
  admissionForm!: FormGroup;
  admissionData: Admission = new Admission();
  term: string = '';
  status:string='';
  blockDate:string='';
  admissions: Admission[] = [];
 
  

  constructor(private admissionService: AdmissionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   

    this.getAdmissions();

  }

  getAdmissions(): void {
    this.admissionService.getAdmissions()
      .subscribe(admissions => {
        this.admissions = admissions;
      });
  }
  // successMessage: string = ''; 
  onEdit(admission: any):void {
    const id = admission.id;
    const status = admission.status;
  
    this.admissionService.editAdmission(id, status)
      .subscribe(
        response => {
          const token = response.token;
          console.log(token);
          // localStorage.setItem('token', token);
          // this.admissions = response;
          console.log(response);
          // this.successMessage = 'Admission updated successfully';

        },
        error => {
          console.error(error);
        }
      );
  }
  searchAdmission() {
    this.admissionService.searchAdmission(this.term).subscribe(
      (response: any[]) => {
        this.admissions = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterAdmission() {
    this.admissionService.filterAdmission(this.status).subscribe(
      (response: any[]) => {
        this.admissions = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onBlock(admission: any):void {
    const id = admission.id;
    const blockDate = admission.blockDate;
  
    this.admissionService.BlockDate(id, blockDate)
      .subscribe(
        response => {
          const token = response.token;
          console.log(token);
          // localStorage.setItem('token', token);
          // this.admissions = response;
          console.log(response);
          // this.successMessage = 'Admission updated successfully';

        },
        error => {
          console.error(error);
        }
      );
  }
}
