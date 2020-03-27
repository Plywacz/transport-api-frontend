import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../services/user/user.service';

/*
 * intercepts http requests from the application to add a JWT authorization token to
 *  the Authorization header if the user is logged in.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currUser = this.authenticationService.currentUserValue;

    if (currUser && currUser.token) {  //if user logged in and has token then add header to request
      const tokenVal = 'Bearer ' + currUser.token;
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          // 'Authorization': 'Bearer ${currUser.token}'
          'Authorization': tokenVal,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        }
      });
    }
    return next.handle(req);
  }
}
