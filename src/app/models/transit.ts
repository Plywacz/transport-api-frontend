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
