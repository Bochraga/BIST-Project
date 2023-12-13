import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Service/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  file: File | null = null;
  name: string = '';

  constructor(private userService:UserService ) { }

  onSubmit() {
    if (!this.file || !this.name) {
      console.log('Please select a file and enter a name');
      return;
    }
  
    this.userService.uploadDocument(this.file, this.name).subscribe(
      response => {
        console.log('Document uploaded successfully');
        // Faire quelque chose avec la réponse
      },
      error => {
        console.log('Failed to upload document', error);
        // Traiter l'erreur
      }
    );
  }
  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  
  
  ngOnInit(): void {}
}
