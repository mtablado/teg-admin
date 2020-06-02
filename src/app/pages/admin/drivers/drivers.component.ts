import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { log } from '../../../../providers/log/logger.service';
import { Driver } from '../../../../providers/drivers/driver-entity';
import { DriversService } from '../../../../providers/drivers/drivers.service';
import { CheckboxRenderComponent } from './checkbox-render.component';

@Component({
  selector: 'ngx-drivers-table',
  templateUrl: './drivers.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AdminDriversComponent implements OnInit {

  private logger: debug.Debugger = log.extend('admin-drivers-component');
  private nameTitle= $localize`:@@admin.drivers.table.header.name:Name`;
  private lastnameTitle= $localize`:@@admin.drivers.table.header.lastname:Lastname`;
  private plateTitle= $localize`:@@admin.drivers.table.header.plate:Plate`;
  private usernameTitle= $localize`:@@admin.drivers.table.header.username:Username`;
  private statusTitle= $localize`:@@admin.drivers.table.header.status:Status`;
  private isActiveTitle= $localize`:@@admin.drivers.table.header.isActive:Active`;

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
        title: this.nameTitle,
        type: 'string',
      },
      lastname: {
        title: this.lastnameTitle,
        type: 'string',
      },
      plate: {
        title: this.plateTitle,
        type: 'string',
      },
      username: {
        title: this.usernameTitle,
        type: 'string',
        editable: 'false',
      },
      status: {
        title: this.statusTitle,
        type: 'string',
      },
      enabled: {
        title: this.isActiveTitle,
        type: 'custom',
        renderComponent: CheckboxRenderComponent,
        editor: {
          type: 'checkbox',
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  drivers: Driver[] = [];

  constructor(private service: DriversService) {
    // Nothing
  }

  ngOnInit() {

    this.service.getAllDrivers()
      .subscribe((driver: Driver[]) => {
        this.drivers = this.drivers.concat(driver);
        this.source.load(this.drivers);
      },
      () => {
        this.source.load(this.drivers);
      });
  }

  onEditConfirm(event): void {
    this.logger('data:' + JSON.stringify(event.data));
    this.logger('newData:' + JSON.stringify(event.newData));
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
