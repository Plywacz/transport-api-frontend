import {Transit} from './transit';

/**
 * represents driver fetched from backend api
 */
export class Driver {
  id: number;
  enrolledDate: Date;
  firstName: string;
  lastName: string;
  transits: Transit[];
}
