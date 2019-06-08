import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
// import { oboe } from 'oboe/dist/oboe-browser';

import { environment } from '../../environments/environment';
import { Driver } from './driver-entity';
import { DriverPosition } from './driver-position-entity';

@Injectable()
export class DriversService {

  private getDriversURL = environment.server_api + '/drivers';
  private putDriversURL = environment.server_api + '/drivers/';
  private getTrafficURL = environment.server_api + '/traffic';

  // TODO generate state for drivers to relax the server.
  constructor(private http: HttpClient) {

  }

  getDrivers(): Observable<Driver[]> {
    return this.loadData();
  }

  saveDriver(driver: Driver): Observable<Driver> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });

    const options = {
      headers: headers,
    };

    return this.http.patch<Driver>(this.putDriversURL, driver, options)
      .pipe(
        retry(1),
      );
  }

  traffic(): Observable<DriverPosition[]> {
    return this.requestTraffic();
  }

  requestTraffic(): Observable<DriverPosition[]> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/stream+json',
    });

    const options = {
      headers: headers,
    };

    return this.http.get<DriverPosition[]>(this.getTrafficURL, options)
      .pipe(
        retry(1),
      );
  }

  loadData(): Observable<Driver[]> {

    const headers = new HttpHeaders({
      'Content-Type':  'application/stream+json',
    });

    const options = {
      headers: headers,
    };

    return this.http.get<Driver[]>(this.getDriversURL, options)
      .pipe(
        retry(1),
      );

  }

}
