import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiUrl + '/users';
  
  constructor(private http: HttpClient) { }

  login(email: string, password:string) : Observable<User> {
    return this.http.post<User>(`${this.apiURL}/login`, {email, password})
  }
  
}
