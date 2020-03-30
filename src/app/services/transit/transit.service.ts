import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transit} from '../../models/transit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransitService {
  private readonly transitUrl: string = 'http://localhost:8080/api/transits/';

  constructor(private http: HttpClient) {
  }

  public addTransit(transit: Transit): Observable<any> {
    return this.http.post(this.transitUrl, transit);
  }

  public deleteTransit(id: number) {
    return this.http.delete(this.transitUrl + id);
  }
}
