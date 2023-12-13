import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../Service/SuperAdmin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  admins: any[] = [];
  searchTerm: string = '';
  selectedAdmins: any;
  modifyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private adminService: SuperAdminService) { 
    this.modifyForm = this.formBuilder.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      birthdate: [''],
      occupation: [''],
      username: [''],
      nationality: [''],
      address: ['']
    });
  }
  

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.listAdmins().subscribe(
      response => {
        this.admins = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  search() {
    this.adminService.searchAdmin(this.searchTerm).subscribe(
      response => {
        this.admins = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteAdmin(id: number) {
    this.adminService.deleteAdmin(id).subscribe(
      response => {
        console.log('Admin deleted successfully');
        // Reload the list of admins
        this.loadAdmins();
      },
      error => {
        console.error(error);
      }
    );
  }
  editAdmin() {
    if (this.selectedAdmins) {
      const updatedData = this.modifyForm.value;
        this.adminService.editAdmin(this.selectedAdmins.id, updatedData).subscribe(
          (response) => {
            console.log('Admin details updated successfully', response);
            this.selectedAdmins = null;
             this.loadAdmins();
      },
      error => {
        console.error(error);
      }
    );
  }}
  selectAdmins(admin: any) {
    this.selectedAdmins = admin;
    this.modifyForm.patchValue({
      email: admin.email,
      password: admin.password,
      firstName: admin.firstName,
      lastName: admin.lastName,
      birthdate: admin.birthdate,
      phone: admin.phone,
      occupation: admin.occupation,
      address: admin.address,
      username: admin.username,
      nationality:admin.nationality 
    });
  }

  changeAdminStatus(id: number) {
    this.adminService.changeAdminStatus(id)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

}
