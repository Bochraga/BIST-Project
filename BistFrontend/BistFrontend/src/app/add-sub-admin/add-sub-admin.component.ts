import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../Service/admin.service';

@Component({
  selector: 'app-add-sub-admin',
  templateUrl: './add-sub-admin.component.html',
  styleUrls: ['./add-sub-admin.component.css']
})
export class AddSubAdminComponent implements OnInit {
  adminForm: FormGroup;
  constructor(private adminService: AdminService, private formBuilder: FormBuilder) {
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
      role: ['', Validators.required]
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
