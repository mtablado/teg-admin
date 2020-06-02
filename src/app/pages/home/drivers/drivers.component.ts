import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { concatMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { log } from '../../../../providers/log/logger.service';
import { Driver } from '../../../../providers/drivers/driver-entity';
import { DriversService } from '../../../../providers/drivers/drivers.service';

@Component({
  selector: 'ngx-drivers',
  styleUrls: ['./drivers.component.scss'],
  templateUrl: './drivers.component.html',
})
export class DriversComponent implements OnInit, OnDestroy {

  private logger: debug.Debugger = log.extend('drivers-component');

  drivers: Driver[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  driversSubscription: any;

  @Output()
  driverClicked = new EventEmitter<Event>();

  constructor(private driversService: DriversService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {

    // debug.enable('drivers-component');
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.drivers = [];
    this.driversSubscription = this.pollingDrivers()
      .subscribe((drivers) => {
        this.drivers = drivers;
      });

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.driversSubscription.unsubscribe();
  }

  onDriverClick(event): void {
    this.logger('click event:' + event);
    this.driverClicked.emit(event);
  }

  pollingDrivers(): Observable<Driver[]> {
    const drivers$ = this.driversService.getDrivers();
    const polledDrivers$ = timer(0, environment.refresh_drivers_interval).pipe(
      concatMap(_ => drivers$),
    );
    return polledDrivers$;
  }
}
