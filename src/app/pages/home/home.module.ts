import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriversService } from '../../../providers/drivers/drivers.service';
import { UsersService } from '../../../providers/users/user.service';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    LeafletModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    LeafletComponent,
    DriversComponent,
  ],
  providers: [
    DriversService,
    UsersService,
  ],
})
export class HomeModule {}
