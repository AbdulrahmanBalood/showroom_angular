import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override router: Router, protected override keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
    console.log('AuthGuard initialized'); // Debugging log to check guard initialization
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('isAccessAllowed called'); // Debugging log to check if function is executed

    if (!this.authenticated) {
      console.log('User not authenticated, redirecting to login'); // Log before login redirection
      await this.keycloakAngular.login({ redirectUri: window.location.origin + state.url });
      return false;
    }

    const requiredRoles = route.data['roles'];
    const userRoles = this.keycloakAngular.getKeycloakInstance().realmAccess?.roles || [];
    const clientRoles = this.keycloakAngular.getKeycloakInstance().resourceAccess?.['frontend']?.roles || [];

    // Check if the user has the required roles
    if (!requiredRoles || requiredRoles.every((role: any) => userRoles.includes(role) || clientRoles.includes(role))) {
      console.log('User authorized'); // Log if user is authorized
      return true;
    }

    console.log('User lacks required roles, redirecting to home'); // Log if user lacks roles
    this.router.navigate(['/']);
    return false;
  }
}
