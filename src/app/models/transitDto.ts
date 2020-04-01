/**
 * is used for transfer data from frontend to backend
 */
export class TransitDto {
  driverId: number;
  sourceAddress: string;
  destinationAddress: string;
  price: number;
  date: string;
}
