import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';

import { Response } from '@angular/http';
import { User } from '../user';
import { Task } from '../task';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:3000";

  // Not needed for sending JSON but keeping in case of later use
  /*private  headers = new HttpHeaders({ 
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  });*/

  constructor(private http:HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users/' + id);
  }

  addUser(user: User): Observable<User[]> {
    const body = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
    return this.http.post<User[]>(this.url + '/adduser', body).pipe(
      catchError(response => { return observableThrowError(response); }));;
  }

}
