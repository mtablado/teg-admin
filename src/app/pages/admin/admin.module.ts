import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DriversService } from '../../../providers/drivers/drivers.service';
import { AuthGuard } from '../../../providers/security/auth-guard.service';
import { httpInterceptorProviders } from '../../../providers/http/interceptors-index';

import { AdminRoutingModule, routedComponents } from './admin-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    AdminRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DriversService,
    httpInterceptorProviders,
    AuthGuard,
  ],
  entryComponents: [
  ],
})
export class AdminModule { }
