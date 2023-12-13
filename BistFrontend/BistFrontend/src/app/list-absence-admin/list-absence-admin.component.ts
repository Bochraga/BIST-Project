import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../Service/absence.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-absence-admin',
  templateUrl: './list-absence-admin.component.html',
  styleUrls: ['./list-absence-admin.component.css']
})
export class ListAbsenceAdminComponent implements OnInit {
  
  date: string = '';
  classe: string = '';
  semester: string = '';
  selectedAbsence: any; // Stocke l'absence sélectionnée pour modification

  modifyForm: FormGroup;
  absenceList: any[] = [];

  constructor(private formBuilder: FormBuilder, private absenceService: AbsenceService) {
    this.modifyForm = this.formBuilder.group({
      student_name: [''],
      classe: [''],
      subject: [''],
      date: [''],
      semester: [''],
      hour: ['']
    });
  }

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences() {
    this.absenceService.getAbsencesTeacher().subscribe(
      (response) => {
        this.absenceList = response;
        console.log('Absences:', this.absenceList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Méthode pour sélectionner l'absence à modifier
  selectAbsence(absence: any) {
    this.selectedAbsence = absence;
    this.modifyForm.patchValue({
      student_name: absence.student,
      classe: absence.class,
      subject: absence.subject,
      date: absence.date,
      semester: absence.semester,
      hour: absence.hour
    });
  }

  submitModifyForm() {
    if (this.selectedAbsence) {
      const updatedData = this.modifyForm.value;

      this.absenceService.modifyAbsences(this.selectedAbsence.id, updatedData).subscribe(
        (response) => {
          console.log('Absence modified successfully:', response);
          this.loadAbsences();
          this.selectedAbsence = null; // Réinitialise l'absence sélectionnée
        },
        (error) => {
          console.error('Error modifying absence:', error);
        }
      );
    }
  }

searchAbsence() {
    this.absenceService.searchAbsence(this.date, this.classe, this.semester)
      .subscribe(
        (data) => {
          this.absenceList = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  deleteAbsence(id: number): void {
    this.absenceService.deleteAbsences(id)
      .subscribe(
        response => {
          console.log('Absence deleted successfully:', response);
          this.loadAbsences();
        },
        error => {
          console.error('Error deleting absence:', error);
        }
      );
  }
}