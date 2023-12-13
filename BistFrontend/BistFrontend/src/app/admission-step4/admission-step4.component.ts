import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admission } from '../Models/admission';
import { Router } from '@angular/router';
import { AdmissionService } from '../Service/admission.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-admission-step4',
  templateUrl: './admission-step4.component.html',
  styleUrls: ['./admission-step4.component.css']
})
export class AdmissionStep4Component implements OnInit {
  admissionForm!: FormGroup;
  admissionData: Admission = new Admission();
  childFullNames: AbstractControl[] = [];
  admissions: any[] = [];
  blockDate!: string; 

  reservedTimes: Date[] = [];
  timeAlreadyReserved: boolean = false;

  constructor(private router: Router,private admissionService: AdmissionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.admissionForm = this.formBuilder.group({
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
    this.router.navigate(['/AddAdmission2']);
    
  }
  navigateToNextStep() {
    this.router.navigate(['/AddAdmission4']);

  }
  validateStartDateTime() {
    const startDateTime = new Date(this.admissionForm.value.startdate);
    if (startDateTime.getHours() < 8 || startDateTime.getHours() >= 17) {
      this.admissionForm.controls.startdate.setErrors({ invalidTimeRange: true });
    } else {
      this.admissionForm.controls.startdate.setErrors(null);
    }
  }

  validateEndDateTime() {
    const endDateTime = new Date(this.admissionForm.value.enddate);
    if (endDateTime.getHours() < 8 || endDateTime.getHours() >= 17) {
      this.admissionForm.controls.enddate.setErrors({ invalidTimeRange: true });
    } else {
      this.admissionForm.controls.enddate.setErrors(null);
    }
  }
  isTimeAlreadyReserved(): boolean {
    const startDateTime = new Date(this.admissionForm.value.startdate);
    const endDateTime = new Date(this.admissionForm.value.enddate);
  
    // Vérifiez si le temps est déjà réservé
    // Remplacez cette logique par la vérification réelle de la disponibilité du temps
    if (startDateTime.getHours() < 8 || endDateTime.getHours() >= 17) {
      return true;
    }
  
    return false;
  }
  onSubmit() {
    if (this.admissionForm.valid) {
      const admissionData = this.admissionForm.value;
  
      this.admissionService.addAdmission(admissionData)
        .subscribe(
          response => {
            console.log(response);
            this.admissionForm.reset();
            this.timeAlreadyReserved = false;
          },
          error => {
            console.log("Time is already reserved");
            this.timeAlreadyReserved = true;
            console.error(error);
          }
        );
    }
  }
  
  checkTimeAndDisplayMessage() {
    this.isTimeAlreadyReserved = this.isTimeAlreadyReserved;
    }
  
  getDateTimeRange(): string {
    const startDateTime = new Date(this.admissionForm.value.startdate);
    const endDateTime = new Date(this.admissionForm.value.enddate);
  
    const startFormatted = startDateTime.toLocaleString();
    const endFormatted = endDateTime.toLocaleString();
  
    return `Start: ${startFormatted} - End: ${endFormatted}`;
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Une erreur côté client s'est produite. Gérer l'erreur localement.
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Le serveur a renvoyé une réponse avec un code d'erreur.
      // Vous pouvez consulter les détails de l'erreur dans error.error.
      console.error(
        `Erreur côté serveur ${error.status}, ` +
        `message : ${error.error}`);
    }
  }

  get childrenNumberControl(): AbstractControl {
    return this.admissionForm.get('childrenNumber') as AbstractControl;
  }
}


