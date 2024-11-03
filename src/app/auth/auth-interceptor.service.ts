import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = this.keycloakService.isLoggedIn();
      if (loggedIn) {
        // Attempt to get the token synchronously
        const token = this.keycloakService.getKeycloakInstance().token;
        if (token) {
          const headers = req.headers.set('Authorization', `Bearer ${token}`);
          const authReq = req.clone({ headers });
          return next.handle(authReq);
        } else {
          console.error('Token not available');
          return next.handle(req);
        }
      } else {
        return next.handle(req);
      }
    } else {
      // For SSR or when not running in the browser
      return next.handle(req);
    }
  }
}