import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../models/user-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly loginUrl: string;
  private readonly registerUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/users/api/login';
    this.registerUrl = 'http://localhost:8080/users/api/register';
  }

  public register(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.registerUrl, user);
  }
}
