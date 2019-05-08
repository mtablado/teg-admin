import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDriversComponent } from './drivers/drivers.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: 'drivers',
    component: AdminDriversComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
  AdminDriversComponent,
];
