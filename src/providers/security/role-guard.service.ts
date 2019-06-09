import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators/map';

import { NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';

import { UsersService } from '../users/user.service';
import { User } from '../users/user-entity';
import { Observable, zip } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  // User roles are hierarchichal for easy management. Only one role per user.
  private role: string;

  constructor(private authService: NbAuthService,
    private router: Router,
    private usersService: UsersService) {

    // Prepare user's role for better performance.
    this.loadUser();

    // Reload user's role if the token changes.
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2Token) => {
        if (token.isValid()) {
          this.loadUser();
        }
      });
  }

  private loadUser(): void {
    this.usersService.currentUser().subscribe(
      (user: User) => this.role = user.type,
    );
  }

  private getRole(): Observable<String> {
    // If the role is preloaded, use it, if not, go for it.
    const role$: Observable<String> = new Observable<String>((observer) => {
      if (this.role) {
        observer.next(this.role);
        observer.complete();
      } else {
        this.usersService.currentUser().subscribe(
          (user: User) => {
            this.role = user.type;
            observer.next(this.role);
            observer.complete();
          },
        );
      }
    });

    return role$;
  }

  canActivate(route: ActivatedRouteSnapshot) {

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    const auth$ = this.authService.isAuthenticated();
    const role$ = this.getRole();

    // By zipping both observers we can create the and clause.
    return zip(auth$, role$)
      .pipe(
        map(([auth, role]) => {
          if (!auth) {
            this.router.navigate(['auth/login']);
          }
          return auth && role === expectedRole;
        }),
      );
  }
}
