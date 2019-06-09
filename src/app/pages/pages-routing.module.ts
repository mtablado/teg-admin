import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from '../../providers/security/role-guard.service';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'home',
    component: HomeComponent,
  }, {
    path: 'admin',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ADMIN',
    },
    loadChildren: './admin/admin.module#AdminModule',
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  // }, {
  //   path: '**',
  //   component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
