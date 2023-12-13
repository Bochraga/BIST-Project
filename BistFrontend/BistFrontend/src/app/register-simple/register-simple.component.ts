import { Component, OnInit, Output } from '@angular/core';
import { AuthserviceService } from '../Service/authservice.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-simple',
  templateUrl: './register-simple.component.html',
  styleUrls: ['./register-simple.component.css']
})
export class RegisterSimpleComponent implements OnInit {

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
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
   
  }
  @Output() registrationSuccess: EventEmitter<string> = new EventEmitter<string>();


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
      userRole
    } = this.form;

    this.authService.registerSimpleUser(
      firstName,
      lastName,
      username,
      occupation,
      address,
      nationality,
      email,
      phone,
      birthdate,
      password
    ).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.registrationSuccess.emit(firstName); // Emit event with the user's first name

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}