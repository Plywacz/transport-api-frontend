import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly loginUrl: string;
  private readonly registerUrl: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/api/login';
    this.registerUrl = 'http://localhost:8080/api/register';

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public register(username: string, password: string): Observable<any> {
    return this.http.post<User>(this.registerUrl, {username, password});
  }

  public login(username, password) {
    return this.http.post<any>(this.loginUrl, {username, password})
      .pipe(map(user => {
        //save logged user to local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        //set current user
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public logout() {
    // remove user from local storage
    localStorage.removeItem('currentUser');
    //set current user to null
    this.currentUserSubject.next(null);
  }
}
