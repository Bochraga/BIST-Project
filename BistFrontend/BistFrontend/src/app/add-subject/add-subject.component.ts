import { Component, OnInit } from '@angular/core';
import { Subject } from '../Models/Subject';
import { SubjectService } from '../Service/SubjectService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  newSubject: Subject = new Subject();

  constructor(private subjectService: SubjectService , private router: Router) {}

  ngOnInit(): void {}

  addSubject(): void {
    this.subjectService.addSubject(this.newSubject).subscribe(() => {
      this.newSubject = new Subject();
      this.router.navigate(['/ListSubject']);
    });
  }

}
