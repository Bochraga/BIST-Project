import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admission } from '../Models/admission';
import { Router } from '@angular/router';
import { AdmissionService } from '../Service/admission.service';

@Component({
  selector: 'app-admission-step3',
  templateUrl: './admission-step3.component.html',
  styleUrls: ['./admission-step3.component.css']
})
export class AdmissionStep3Component implements OnInit {

  admissionForm!: FormGroup;
  admissionData: Admission = new Admission();
  // childFullNames: AbstractControl[] = [];
  admissions: any[] = [];
  // blockDate!: string; 

  // reservedTimes: Date[] = [];
  // timeAlreadyReserved: boolean = false;



  constructor(private router: Router,private admissionService: AdmissionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.admissionForm = this.formBuilder.group({
      childrenNumber: ['', Validators.required],
      childFullName: ['', Validators.required],
      childBirthdate: ['', Validators.required],
      status: 'sent',
      childGender: ['', Validators.required],
    });
  }
  navigateToPriviousStep() {
    this.router.navigate(['/AddAdmission2']);
    
  }
  navigateToNextStep() {
    this.router.navigate(['/AddAdmission4']);

  }
}
