import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';


@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsersWithRoleUser();

  }
  fetchUsersWithRoleUser() {
    this.userService.getUsersWithRoleUser().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users with role "ROLE_USER":', error);
      }
    );
    }

    verifyUser(userId: number) {
      this.userService.verifyUser(userId).subscribe(
        (response) => {
          console.log('User verified successfully:', response);
 
        },
        (error) => {
          console.error('Error verifying user:', error);
        }
      );
    }
}
