import { Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/AuthService/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isAuthenticated = signal(false);
  private platformId = inject(PLATFORM_ID);

  
  async ngOnInit() {
    // Check if running in the browser before checking authentication
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = await this.authService.keycloakService.isLoggedIn();
      console.log('loggedIn (browser):', loggedIn); // Client-side log
      this.isAuthenticated.set(loggedIn);
    } else {
      console.log('loggedIn (server): false'); // Server-side log, typically set to false
    }
  }


  async login() {
    await this.authService.keycloakService.login({
      redirectUri: window.location.origin
    });
  }


  async logout() {
    await this.authService.logout();
    this.isAuthenticated.set(false);
  }

}
