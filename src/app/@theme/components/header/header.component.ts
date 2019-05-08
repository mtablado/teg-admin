import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { User } from '../../../../providers/users/user-entity';
import { UsersService } from '../../../../providers/users/user.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: User;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private usersService: UsersService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {

    // this.authService.getToken()
    //   .subscribe((token: NbAuthOAuth2Token) => {

    //     if (token.isValid()) {
    //       // here we receive a payload from the token and assigne it to our `user` variable
    //       this.user = token.getPayload();
    //     }

    //   });

    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2Token) => {

        if (token.isValid()) {
          // TODO find user at backend.
          this.usersService.currentUser().subscribe(
            (user: User) => this.user = user,
          );

        }

      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
