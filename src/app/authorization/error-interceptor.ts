import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';

/*
 * it is added to the request pipeline,
 * intercepts http responses from the api to check if there were any errors.
 *  If there is a 401 Unauthorized response
 *  the user is automatically logged out of the application.
 * Other errors are re-thrown
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(err => {
        if (err.status === 401) {
          this.authenticationService.logout();
          location.reload(true); //todo replace this with something
        }
        const error = err.error.message || err.statusText; //means if  err.error.message is not null assign it to const error otherwise take err.statusText
        return throwError(error);
      }));
  }
}
