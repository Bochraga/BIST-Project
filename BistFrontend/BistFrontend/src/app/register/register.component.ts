import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../Service/authservice.service';
import { userRole } from '../Models/userRole';
import { role } from '../Models/role';
import { RoleService } from '../Service/role.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    username: null,
    occupation: null,
    address: null,
    nationality: null,
    email: null,
    phone: null,
    birthdate: null,
    password: null,
    userRole: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userRoles: role[] = [];
  selectedRole: string = ''; 
  constructor(private authService: AuthserviceService, private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      (roles: role[]) => {
        this.userRoles = roles;
        console.log('User Roles:', this.userRoles); // Add this line to check the roles
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    const {
      firstName,
      lastName,
      username,
      occupation,
      address,
      nationality,
      email,
      phone,
      birthdate,
      password,
    } = this.form;

    const selectedRole: string = this.selectedRole; 
    const roleId = this.findRoleIdByName(selectedRole); 
    console.log('Selected Role Name:', selectedRole);
  console.log('Corresponding Role ID:', roleId); 
  
    this.authService
      .register(
        firstName,
        lastName,
        username,
        occupation,
        address,
        nationality,
        email,
        phone,
        birthdate,
        password,
        roleId
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }

  findRoleIdByName(roleName: string): number {
    const role = this.userRoles.find((role) => role === roleName);
    return role ? this.userRoles.indexOf(role) + 1 : 0; 
  }
}