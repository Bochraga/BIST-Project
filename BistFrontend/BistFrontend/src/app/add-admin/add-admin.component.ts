import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../Service/SuperAdmin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
 adminForm: FormGroup;
    constructor(private adminService: SuperAdminService, private formBuilder: FormBuilder) {
      this.adminForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        birthdate: ['', Validators.required],
        occupation: ['', Validators.required],
        username: ['', Validators.required],
        nationality: ['', Validators.required],
        address: ['', Validators.required],

      });
    }
  
    registerAdmin() {
      if (this.adminForm.valid) {
        this.adminService.registerAdmin(this.adminForm.value)
          .subscribe(
            response => {
              // Gérez la réponse réussie ici
              console.log(response);
            },
            error => {
              // Gérez l'erreur ici
              console.error(error);
            }
          );
      }
    }
  
    ngOnInit(): void {
    }
  }
