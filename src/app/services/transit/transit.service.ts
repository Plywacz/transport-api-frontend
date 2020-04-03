import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transit, TransitDto} from '../../models/transit';
import {DailyInfo} from '../../models/DailyInfo';
import {RangeReport} from '../../models/range-report';

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

  public getMonthlyReport(): Observable<DailyInfo[]> {
    return this.http.get<DailyInfo[]>(this.transitUrl + 'reports/monthly');
  }

  public getReportRange(sdate: Date, edate: Date): Observable<RangeReport> {
    return this.http.get<RangeReport>(this.transitUrl + 'reports/range/' + sdate + '&&' + edate); //todo create this url better way
  }

}
