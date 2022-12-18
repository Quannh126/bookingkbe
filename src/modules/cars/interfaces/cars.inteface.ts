import { ITrip } from "./trip.interface";

export default interface ICar {
  name: string;
  typeCar: string;
  detail: string;
  imagePath: string;
  fare: string;
  capacity: string;
  trips: ITrip[];
  comment: IComment[];
}

export interface IComment {
  _id: string;
  user: string;
  text: string;
  star: number;
  avatar: string;
  date: Date;
}
