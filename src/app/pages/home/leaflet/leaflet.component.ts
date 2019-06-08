import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { concatMap } from 'rxjs/operators';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

import { environment } from '../../../../environments/environment';
import { log } from '../../../../providers/log/logger.service';
import { Driver } from '../../../../providers/drivers/driver-entity';
import { DriverPosition } from '../../../../providers/drivers/driver-position-entity';
import { DriversService } from '../../../../providers/drivers/drivers.service';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Tráfico {{driverClickedEvent}}</nb-card-header>
      <nb-card-body>
        <!--div id="leaflet" leaflet [leafletOptions]="options"></div-->
        <div id="leaflet"></div>
      </nb-card-body>
    </nb-card>
  `,
})
export class LeafletComponent implements OnInit, OnDestroy {

  private logger: debug.Debugger = log.extend('leaflet-component');

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 13,
    center: L.latLng({ lat: 37.8915500, lng: -4.7727500 }),
  };

  @Input()
  set driverClickedEvent(driver: Driver) {
    this.logger('Driver selected:' + JSON.stringify(driver));
    // onInit will set to null.
    if (driver) {
      if (this.map) {
        const marker = this.drivers.get(driver.id);
        if (marker) {
          let zoom = this.map.getZoom();
          if (zoom < 13) {
            zoom = 13;
          }
          this.map.flyTo(marker.getLatLng()/*, {zoom: zoom}*/);
        } else {
          log('The selected driver is not in the map.');
        }
      }
    }
  }

  trafficSubscription: any;
  map: any;

  // Map with drivers positions to interact with the map.
  drivers: Map<any, any>;
  circleOptions = {
    color: '#f03',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5,
  };

  constructor(private driversService: DriversService) {
    this.drivers = new Map();
  }

  ngOnInit() {
    this.map = L.map('leaflet', this.options);
    this.trafficSubscription = this.pollingTraffic()
      .subscribe((drivers) => {

        // var driverMarker = L.marker([37.8915500, -4.7727500]);
        // driverMarker.addTo(this.map);
        this.logger('Drivers received' + JSON.stringify(drivers));

        const _m = this.map;
        const _d = this.drivers;
        const _o = this.circleOptions;
        drivers.forEach(function(driver) {

          // UNKOWN, ACTIVE, OFF, STATIONARY, MOVING
          switch (driver.status) {
            case 'MOVING':
              _o.color = '#009700';
              _o.fillColor = '#009700';
              break;
            case 'STATIONARY':
              _o.color = '#e30000';
              _o.fillColor = '#e30000';
              break;
            case 'OFF':
              _o.color = '#6a7783';
              _o.fillColor = '#6a7783';
              break;
            case 'UNKOWN':
              _o.color = '#d4d412';
              _o.fillColor = '#d4d412';
              break;
          }

          let driverMarker = _d.get(driver.id);
          const tooltip = '<b>' + driver.plate + '</b><br>' + driver.name;
          let createMarker = true;
          if (driverMarker) {
            if (driverMarker.options.color === _o.color) {
              createMarker = false;
              driverMarker.setTooltipContent(tooltip).openTooltip();
              driverMarker.setLatLng(L.latLng(driver.latitude, driver.longitude));
            } else {
              // Since I cannot find the way to change the color I remove and create it again.
              driverMarker.removeFrom(_m);
            }
          }
          if (createMarker) {
            driverMarker = L.circleMarker([driver.latitude, driver.longitude], _o);
            driverMarker.bindTooltip(tooltip).openTooltip();
            driverMarker.addTo(_m);
          }

          _d.set(driver.id, driverMarker);
        });

      });
  }

  ngOnDestroy() {
    this.trafficSubscription.unsubscribe();
  }

  pollingTraffic(): Observable<DriverPosition[]> {
    const traffic$ = this.driversService.traffic();
    const polledTraffic$ = timer(0, environment.refresh_traffic_interval).pipe(
      concatMap(_ => traffic$),
    );
    return polledTraffic$;
  }

}
