import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';

import { User } from '../../../../providers/users/user-entity';
import { UsersService } from '../../../../providers/users/user.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private usersService: UsersService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {

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
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
