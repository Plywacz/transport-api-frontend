import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

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
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ${currentUser.token}'
        }
      });
    }
    return next.handle(req);
  }
}
