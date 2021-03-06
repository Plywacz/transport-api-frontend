import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../../models/driver';
import {DriverReport} from '../../models/driver-report';
import {DailyInfo} from '../../models/DailyInfo';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private readonly driverUrl: string = 'http://localhost:8080/api/drivers/';

  constructor(private http: HttpClient) {
  }

  public getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driverUrl);
  }

  public addDriver(firstName: string, lastName: string): Observable<any> {
    return this.http.post(this.driverUrl, {firstName, lastName});
  }

  public deleteDriver(id: number): Observable<any> {
    return this.http.delete(this.driverUrl + id);
  }

  public getDriver(id: number): Observable<Driver> {
    return this.http.get<Driver>(this.driverUrl + id);
  }

  public getDriverReport(id: number): Observable<DriverReport> {
    return this.http.get<DriverReport>(this.driverUrl + id + '/report');
  }

}
