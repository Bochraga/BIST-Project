import { Component, OnInit } from '@angular/core';
import { Subject } from '../Models/Subject';
import { SubjectService } from '../Service/SubjectService';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css']
})
export class ListSubjectComponent implements OnInit {
  subjects: Subject[] = [];
  selectedStatus: { [key: number]: boolean } = {};
  searchTerm: string = '';
  selectedCoefficient: number | null = null;
  filteredSubjects: Subject[] = [];
  modifyForm: FormGroup;
  selectedSubject: Subject | null = null; // Pour stocker le sujet sélectionné

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService) {
    this.modifyForm = this.formBuilder.group({
      name: [''],
      coefficient: [''],
      level: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubject().subscribe((subjects) => {
      this.subjects = subjects;
      this.filteredSubjects = subjects;
    });
  }

  deleteSubject(subjectId: number): void {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.deleteSubject(subjectId).subscribe(
        () => {
          this.loadSubjects();
        },
        (error) => {
          console.error('Error deleting subject:', error);
        }
      );
    }
  }
  enableOrDisableSubject(subject: Subject): void {
    const newStatus = !subject.status; 
  
    this.subjectService.changeSubjectStatus(subject.id, newStatus).subscribe(
      (response: any) => {
        console.log('Server response:', response);
  
        if (response.enabled !== undefined) {
          subject.status = response.enabled;
        } else {
          console.error('Unexpected server response:', response);
        }
      },
      (error) => {
        console.error('Error changing subject status:', error);
      }
    );
  }

  changeStatus(subjectId: number, newStatus: boolean): void {
    this.subjectService.changeSubjectStatus(subjectId, newStatus).subscribe(
      () => {
        console.log('Status changed successfully.');
      },
      (error) => {
        console.error('Error changing subject status:', error);
      }
    );
  }

  matchesSearchTerm(subject: Subject): boolean {
    if (!this.searchTerm.trim()) {
      return true;
    }

    return (
      subject.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      subject.level.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  searchSubjects(): void {
    this.loadSubjects(); 
  }
  
  
  
  filterSubjects(coefficient: number | null): void {
    if (coefficient !== null) {
      this.filteredSubjects = this.subjects.filter((subject) => subject.coefficient === coefficient);
    } else {
      this.filteredSubjects = this.subjects;
    }
  }
  

private updateSubjectStatus(subjectId: number, status: boolean): void {
    const subject = this.subjects.find((s) => s.id === subjectId);
    if (subject) {
      subject.status = status;
    }
}
selectSubject(subject: Subject): void {
  this.selectedSubject = subject;
  this.modifyForm.patchValue({
    name: subject.name,
    coefficient: subject.coefficient,
    level: subject.level,
    category: subject.category
  });
}

modifySubject(): void {
  if (this.selectedSubject) {
    const updatedData = this.modifyForm.value;
    const subjectId = this.selectedSubject.id;
    this.subjectService.updateSubject(subjectId, updatedData).subscribe(
        (subject) => {
            console.log('Subject updated:', subject);
            this.loadSubjects();
        },
        (error) => {
            console.error('Error updating subject:', error);
        }
    );
}
}
}


