import { Component, OnInit } from '@angular/core';
import { PasswordResetServiceService } from '../Service/password-reset-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('500ms ease-in-out'))
    ])
  ]
})
export class PasswordResetRequestComponent implements OnInit {

  email: string = '';
  emailSent: boolean = false; 
  message: string = '';

  constructor(private passwordResetService: PasswordResetServiceService) {}

  onSubmit() {
    this.passwordResetService.sendResetEmail(this.email).subscribe(
      () => {
        console.log('Password reset email sent');
        this.emailSent = true;
        this.message = 'Password reset email has been sent. Please check your inbox.';
        setTimeout(() => {
          this.emailSent = false;
          this.message = '';
        }, 6000); 
      },
      error => {
        console.error('Error sending password reset email', error);
        this.emailSent = true;
        this.message = 'Error sending password reset email. Please try again.';
        setTimeout(() => {
          this.emailSent = false;
          this.message = '';
        }, 5000); 
      }
    );
  }


  ngOnInit(): void {
  }

}
