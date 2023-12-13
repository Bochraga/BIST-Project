import { Component, OnInit } from '@angular/core';
import { AdmissionService } from '../Service/admission.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admission } from '../Models/admission';

@Component({
  selector: 'app-admission-step2',
  templateUrl: './admission-step2.component.html',
  styleUrls: ['./admission-step2.component.css']
})
export class AdmissionStep2Component implements OnInit {
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
      
      fatherFullName: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      fatherEmail: ['', [Validators.required]],
      fatherNationality: ['', Validators.required],
      fatherPhone: ['', [Validators.required, Validators.maxLength(8)]],
      homeAddress: ['', Validators.required],
      status: 'sent',
      familySituation: ['', Validators.required],
      childGender: ['', Validators.required],
      startdate:['',Validators.required],
      enddate:['',Validators.required],
     blockDate:'Not Blocked',
    });
  }
  navigateToPriviousStep() {
    this.router.navigate(['/AddAdmission1']);
    
  }
  navigateToNextStep() {
    this.router.navigate(['/AddAdmission3']);

  }

}
