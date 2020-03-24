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
    this.loginUrl = 'http://localhost:8080/api/login'; //todo update svager doc, because contains not actual links
    this.registerUrl = 'http://localhost:8080/api/register';
  }

  public register(user: UserDto): Observable<any> {
    return this.http.post<UserDto>(this.registerUrl, user);
  }

  public login(user: UserDto): Observable<any> {
    return this.http.post<UserDto>(this.loginUrl, user);
  }
}
