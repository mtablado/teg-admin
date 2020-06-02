import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { log } from '../log/logger.service';
import { User } from './user-entity';

@Injectable()
export class UsersService implements OnInit {

  private logger: debug.Debugger = log.extend('users-service');
  private getUsersURL = environment.server_api + '/users';
  private getCurrentUserURL = environment.server_api + '/users/current-user';

  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
  });

  private options = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {

  }

  users: User[] = [];

  ngOnInit(): void {
    this.logger('Loading data on init.');
    this.loadData();
  }

  public currentUser(): Observable<User> {
    return this.http.get<User>(this.getCurrentUserURL, this.options);
  }

  getData() {
    this.loadData();
    return this.users;
  }

  loadData() {

    this.http.get<User[]>(this.getUsersURL, this.options)
      .pipe(
        retry(1),
      ).subscribe((users) => {
        this.logger(`user received: +${JSON.stringify(users)}`);
        this.users = users;
      });
  }
}
