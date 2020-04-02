/**
 * represents transit fetched from backend api
 */
export class Transit {
  id: number;
  sourceAddress: string;
  destinationAddress: string;
  price: number;
  date: Date;
  distance: number;
  driverId: number;
}

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
