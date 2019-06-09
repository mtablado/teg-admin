import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DriversService } from '../../../providers/drivers/drivers.service';
import { UsersService } from '../../../providers/users/user.service';
import { AuthGuard } from '../../../providers/security/auth-guard.service';
import { httpInterceptorProviders } from '../../../providers/http/interceptors-index';

import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import { CheckboxRenderComponent } from './drivers/checkbox-render.component';

@NgModule({
  imports: [
    ThemeModule,
    AdminRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    CheckboxRenderComponent,
  ],
  providers: [
    DriversService,
    UsersService,
    httpInterceptorProviders,
    AuthGuard,
  ],
  entryComponents: [
    CheckboxRenderComponent,
  ],
})
export class AdminModule { }
