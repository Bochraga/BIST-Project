import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { user } from '../Models/user';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: ['', Validators.required],
      occupation: ['', Validators.required],
      address: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (response) => {
        this.userData = response.user;
        this.profileForm.patchValue(this.userData); // Populate the form fields with user data
      },
      (error) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.editProfile(this.profileForm.value).subscribe(
        () => {
          console.log('Profile updated successfully.');
        },
        (error) => {
          console.error('Failed to update profile:', error);
        }
      );
    }
  }
}
