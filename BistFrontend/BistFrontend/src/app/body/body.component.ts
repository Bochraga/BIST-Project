import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../Service/authservice.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetRequestComponent } from '../password-reset-request/password-reset-request.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  isLoggedIn = false;
  userRole: string = '';
  isAdmin: boolean = false;
  isChatOpen: boolean = false;
  disableScroll: boolean = false;
  chatHistoryScrollPosition = 0;
  chatMessages: string[] = [];
  showChatHistory = false;
  emailSent: boolean = false;
  email: string = '';

  constructor(private router: Router, private authService: AuthserviceService, private http: HttpClient,private dialog: MatDialog) { }

  sendMessage() {
    const userInput = document.getElementById('user-input') as HTMLInputElement;
    const userMessage = userInput.value;
    userInput.value = '';

    const historyElement = document.getElementById('chat-history');
    if (historyElement) {
      this.http.post('http://localhost:5000/predict', { message: userMessage }).subscribe((data: any) => {
        const chatbotResponse = data.answer;
        this.chatMessages.push(`User: ${userMessage}`);
        this.chatMessages.push(`Chatbot: ${chatbotResponse}`);
        this.disableScroll = true;

        historyElement.scrollTop = historyElement.scrollHeight;
        this.showChatHistory = true;

      });
    }
  }

  
  toggleChatInterface() {
    console.log('Toggle chat interface clicked');
    this.isChatOpen = !this.isChatOpen;

    if (this.isChatOpen) {
      const historyElement = document.getElementById('chat-history');
      this.disableScroll = false;

      if (historyElement) {
        historyElement.scrollTop = historyElement.scrollHeight;
        this.chatHistoryScrollPosition = historyElement.scrollTop;

      }
    }
  }
  openPasswordResetModal() {
    const dialogRef = this.dialog.open(PasswordResetRequestComponent, {
      width: '400px',
    });
  
    // Subscribe to the afterClosed event to reset flags and fields when modal is closed
    dialogRef.afterClosed().subscribe(() => {
      this.emailSent = false;
      this.email = '';
    });
  }

  ngOnInit(): void {
    const connectedUser = localStorage.getItem('connectedUser');
    if (this.authService.isLoggedIn) {
      this.connectedUserName = this.authService.getConnectedUserName();
      this.authService.userRole$.subscribe((role: string) => {
        // this.userRole = role;
        // this.isAdmin = role == 'ROLE_ADMIN';
      });
    }

    if (connectedUser) {
      this.connectedUserName = connectedUser;
    }
  }

  isLoginModalOpen = false;
  isRegisterOptionsModalOpen = false;
  isRegisterSimpleModalOpen = false;
  isRegisterAdminModalOpen = false;
  connectedUserName: string | null = null;
  isDropdownOpen: boolean = false;

  /*
    getDashboardLink(): string {
      if (this.userRole === 'ROLE_ADMIN') {
        return '/eventlistAdmin';
      } else {
        return '/editprofile';
      }
    }
    */
  logout(): void {
    this.authService.logout();
    this.connectedUserName = '';
    this.userRole = '';
    this.router.navigate(['/']);
  }

  isTokenExpired(): boolean {
    return this.authService.isTokenExpired();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  showDropdown(): void {
    this.isDropdownOpen = true;
  }

  hideDropdown(): void {
    this.isDropdownOpen = false;
  }
  handleLoginSuccess(username: string): void {
    this.connectedUserName = username;
    localStorage.setItem('connectedUser', username);
    this.closeLoginModal();
  }


  handleRegistrationSuccess(firstName: string): void {
    this.connectedUserName = firstName;
    this.closeRegisterSimpleModal();
    this.router.navigate(['/']);
    this.closeRegisterOptionsModal();
  }
  
  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }
  openRegisterOptionsModal(): void {
    this.isRegisterOptionsModalOpen = true;
  }

  closeRegisterOptionsModal(): void {
    this.isRegisterOptionsModalOpen = false;
  }

  openRegisterSimpleModal(): void {
    this.isRegisterOptionsModalOpen = false;
    this.isRegisterSimpleModalOpen = true;
  }

  closeRegisterSimpleModal(): void {
    this.isRegisterSimpleModalOpen = false;
  }

  openRegisterAdminModal(): void {
    this.isRegisterOptionsModalOpen = false;
    this.isRegisterAdminModalOpen = true;
  }

  closeRegisterAdminModal(): void {
    this.isRegisterAdminModalOpen = false;
  }

  backToRegisterOptions(): void {
    this.isRegisterSimpleModalOpen = false;
    this.isRegisterAdminModalOpen = false;
    this.isRegisterOptionsModalOpen = true;
  }
}
