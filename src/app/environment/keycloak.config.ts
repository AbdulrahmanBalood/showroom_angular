import { KeycloakService } from 'keycloak-angular';
import { environment } from './environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

export function initializeKeycloak(
  keycloak: KeycloakService,
  platformId: Object
) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      return keycloak.init({
        config: {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          checkLoginIframe: true,
          checkLoginIframeInterval: 25
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets'],
        loadUserProfileAtStartUp: true
      });
    }
    return Promise.resolve();
  };
}


