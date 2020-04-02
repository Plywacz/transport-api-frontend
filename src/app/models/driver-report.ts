export class DriverReport {
  basicInfo: BasicDriverInfo;
  totalDriverInfo: TotalDriverInfo;
  monthlyDriverInfos: MonthlyDriverInfo[];
}

export class BasicDriverInfo {
  id: number;
  firstName: string;
  lastName: string;
}

export class TotalDriverInfo {
  totalDistance: number;
  longestTransit: number;
  mostExpensiveTransit: number;
}

export class MonthlyDriverInfo {
  yearMonthDate: string;
  distancePerMonth: number;
  longestTransitPerMonth: number;
  mostExpensiveTransitPerMonth: number;
}
