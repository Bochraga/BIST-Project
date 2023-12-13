import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from '../Service/authservice.service';
import { Router } from '@angular/router';
import { role } from '../Models/role';
import { RoleService } from '../Service/role.service';
import { PasswordResetServiceService } from '../Service/password-reset-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginError: boolean = false;
  loginSuccess: boolean = false;
  // New add 
  userRole: role[] = [];
  isAdmin = false;
  isUser = false;
  isSubAdmin = false;


  @Output() loginSuccesss: EventEmitter<string> = new EventEmitter<string>();




  constructor(private authService: AuthserviceService, private router: Router, private roleservice: RoleService,
    private passwordResetService: PasswordResetServiceService // Inject the new service
  ) { }

  goToPasswordResetRequest() {
    this.router.navigate(['/password-reset-request']);
  }
 

  resetUserPassword(token: string, newPassword: string): void {
  this.passwordResetService.resetUserPassword(token, newPassword).subscribe(
    () => {
      console.log('Password reset successful');
      // Handle UI feedback to the user if needed (e.g., display a success message)
    },
    error => {
      console.error('Error resetting password', error);
      // Handle UI feedback to the user if needed (e.g., display an error message)
    }
  );
}
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.authService.setConnectedUserName(response.username); // Set the connected user's name
        this.loginSuccess = true;
        this.loginSuccesss.emit(response.username);
        const roles = response.role;
        this.roleservice.setUserRole(roles);

        // Redirigez vers la page appropriée en fonction du rôle de l'utilisateur
        this.redirectToRolePage(roles);
      },
      error => {
        this.loginSuccess = false;
        this.loginError = true;
      }
    );
  }
  redirectToRolePage(roles: string): void {
    if (roles === 'ROLE_ADMIN') {
      this.isAdmin = true;
    }

    else if (roles === 'ROLE_USER') {
      this.isUser = true;
    }

    else {
      this.isSubAdmin = true;
    }
  }

  handleLoginSuccess(loginData: any): void {
    // Get the user's role from the login data
    const userRole = loginData.role;

    // Perform the redirection based on the user's role
    if (userRole === 'ROLE_USER') {
      this.router.navigate(['/home']); // Replace '/home' with the appropriate route for the user dashboard.
    } else if (userRole === 'ROLE_ADMIN') {
      this.router.navigate(['/admin']); // Replace '/admin' with the appropriate route for the admin dashboard.
    } else {
      // Handle other roles or redirect to a default page.
      this.router.navigate(['/default']); // Replace '/default' with the appropriate route.
    }
  }


  ngOnInit(): void {
    this.roleservice.getRoles().subscribe(
      (roles: role[]) => {
        this.userRole = roles;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
