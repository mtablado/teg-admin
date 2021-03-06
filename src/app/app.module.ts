/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import {
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { NbOAuth2AuthStrategy,
  NbAuthModule,
  NbOAuth2GrantType,
  NbAuthOAuth2Token,
  NbOAuth2ClientAuthMethod } from '@nebular/auth';
import { AuthGuard } from '../providers/security/auth-guard.service';
import { RoleGuard } from '../providers/security/role-guard.service';
import { httpInterceptorProviders } from '../providers/http/interceptors-index';
import { environment } from '../environments/environment';
import { UsersService } from '../providers/users/user.service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'backend',
          clientId: 'ElGarabatoApp',
          clientSecret: 'toto',
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          baseEndpoint: environment.server_url,
          token: {
            endpoint: '/oauth/token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2Token,
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login
                              // while success message is shown to the user
          strategy: 'backend',  // strategy id key.
          rememberMe: false,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
          socialLinks: [], // social links at the bottom of a page

        },
        validation: {
          email: {
            required: false,
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    httpInterceptorProviders,
    AuthGuard,
    RoleGuard,
    UsersService,
  ],
})
export class AppModule {
}
