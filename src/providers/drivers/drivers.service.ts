import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
// import { oboe } from 'oboe/dist/oboe-browser';

import { environment } from '../../environments/environment';
import { Driver } from './driver-entity';
import { DriverPosition } from './driver-position-entity';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable()
export class DriversService {

  private getDriversURL = environment.server_api + '/drivers';
  private getAllDriversURL = environment.server_api + '/drivers?all=true';
  private putDriversURL = environment.server_api + '/drivers/';
  private getTrafficURL = environment.server_api + '/traffic';

  private HEADERS: HttpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
  });

  private HTTP_OPTIONS = {
    headers: this.HEADERS,
  };

  // TODO generate state for drivers to relax the server.
  constructor(private http: HttpClient) {

  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.getDriversURL, this.HTTP_OPTIONS)
      .pipe(
        retry(1),
      );
  }

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.getAllDriversURL, this.HTTP_OPTIONS)
      .pipe(
        retry(1),
      );
  }

  saveDriver(driver: Driver): Observable<Driver> {
    return this.http.patch<Driver>(this.putDriversURL, driver, this.HTTP_OPTIONS)
      .pipe(
        retry(1),
      );
  }

  traffic(): Observable<DriverPosition[]> {
    return this.http.get<DriverPosition[]>(this.getTrafficURL, this.HTTP_OPTIONS)
      .pipe(
        retry(1),
      );
  }

}
