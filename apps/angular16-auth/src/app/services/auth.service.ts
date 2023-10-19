import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      `https://localhost:7075/api/Auth/register`,
      user
    ); //https://localhost:7075/api/Auth/register'
  }

  public login(user: User): Observable<string> {
    return this.http.post(`https://localhost:7075/api/Auth/login`, user, {
      responseType: 'text',
    }); //https://localhost:7075/api/Auth/register'
  }

  public getUsername(): Observable<string> {
    // Returned value is a string, not a JSON object.
    return this.http.get(`https://localhost:7075/api/Auth`, {
      responseType: 'text',
    }); //https://localhost:7075/api/Auth/register'
  }
}
