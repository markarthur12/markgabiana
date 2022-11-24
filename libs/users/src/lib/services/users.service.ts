import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiURL}/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
