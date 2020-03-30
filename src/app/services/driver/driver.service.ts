import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private readonly driverUrl: string = 'http://localhost:8080/api/drivers/';

  constructor(private http: HttpClient) {
  }

  public addDriver(firstName: string, lastName: string): Observable<any> {
    return this.http.post(this.driverUrl, {firstName, lastName});
  }

  public deleteDriver(id: number): Observable<any> {
    return this.http.delete(this.driverUrl + id);
  }
}
