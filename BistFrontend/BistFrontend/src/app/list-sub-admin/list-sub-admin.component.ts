import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-sub-admin',
  templateUrl: './list-sub-admin.component.html',
  styleUrls: ['./list-sub-admin.component.css']
})
export class ListSubAdminComponent implements OnInit {

  Subadmins: any[] = [];
  searchTerm: string = '';
  selectedSubAdmins: any;
  modifyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private adminService: AdminService) { 
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
      address: [''],
      roles:['']
    });
  }
  

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.listAdmins().subscribe(
      response => {
        this.Subadmins = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  search() {
    this.adminService.searchAdmin(this.searchTerm).subscribe(
      response => {
        this.Subadmins = response;
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
    if (this.selectedSubAdmins) {
      const updatedData = this.modifyForm.value;
        this.adminService.editAdmin(this.selectedSubAdmins.id, updatedData).subscribe(
          (response) => {
            console.log('SubAdmin details updated successfully', response);
            this.selectedSubAdmins = null;
             this.loadAdmins();
      },
      error => {
        console.error(error);
      }
    );
  }}
  selectAdmins(admin: any) {
    this.selectedSubAdmins = admin;
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
