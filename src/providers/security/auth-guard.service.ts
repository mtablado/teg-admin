import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators/tap';

import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService,
     private router: Router) {
  }

  canActivate() {
    // canActive can return Observable<boolean>, which is exactly what isAuhenticated returns
    // it redirects to login page when not authenticated.
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );

  }
}
