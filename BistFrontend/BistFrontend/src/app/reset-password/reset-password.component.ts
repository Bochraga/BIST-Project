import { Component, OnInit } from '@angular/core';
import { PasswordResetServiceService } from '../Service/password-reset-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string = ''; 
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false; 

  passwordResetSuccess: boolean = false; 
  constructor(private passwordResetService: PasswordResetServiceService , private route: ActivatedRoute,  private router: Router
    ) {}
    onSubmit() {
      if (this.newPassword === this.confirmPassword) {
        this.passwordResetService.resetUserPassword(this.token, this.newPassword).subscribe(
          () => {
            console.log('Password reset successful');
            this.passwordResetSuccess = true;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          },
          error => {
            console.error('Error resetting password', error);
          }
        );
      } else {
        this.passwordMismatch = true;
      }
    }

    passwordsMatch(): boolean {
      return this.newPassword === this.confirmPassword;
    }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || ''; 
    console.log('Token:', this.token);
  }
}
