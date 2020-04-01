import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransitDto} from '../../models/transitDto';
import {Observable} from 'rxjs';
import {Transit} from '../../models/transit';

@Injectable({
  providedIn: 'root'
})
export class TransitService {
  private readonly transitUrl: string = 'http://localhost:8080/api/transits/';

  constructor(private http: HttpClient) {
  }

  public addTransit(transit: TransitDto): Observable<Transit> {
    return this.http.post<Transit>(this.transitUrl, transit);
  }

  public deleteTransit(id: number) {
    return this.http.delete(this.transitUrl + id);
  }
}
