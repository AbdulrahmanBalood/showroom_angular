import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  keycloakService = inject(KeycloakService);
  router = inject(Router);

  async logout() {
    try {
      await this.keycloakService.logout(window.location.origin);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}