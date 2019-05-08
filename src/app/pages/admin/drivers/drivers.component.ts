import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { concatMap } from 'rxjs/operators';

import { Driver } from '../../../../providers/drivers/driver-entity';
import { DriversService } from '../../../../providers/drivers/drivers.service';

@Component({
  selector: 'ngx-drivers-table',
  templateUrl: './drivers.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AdminDriversComponent {

  settings = {
    actions: {
      add: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      lastname: {
        title: 'Apellidos',
        type: 'string',
      },
      plate: {
        title: 'Matrícula',
        type: 'string',
      },
      username: {
        title: 'Usuario',
        type: 'string',
      },
      status: {
        title: 'Estado',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  drivers: Driver[];

  constructor(private service: DriversService) {
    this.drivers = [];
    this.service.getDrivers()
      .subscribe((driver: Driver[]) => {
        this.drivers = this.drivers.concat(driver);
        this.source.load(this.drivers);
      },
      () => {
        this.source.load(this.drivers);
      });
  }

  onEditConfirm(event): void {
    console.log("data:" + JSON.stringify(event.data));
    console.log("newData:" + JSON.stringify(event.newData));
    this.service.saveDriver(event.newData)
      .subscribe((driver) => {
        event.confirm.resolve();
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
