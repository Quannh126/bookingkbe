export interface ITrip {
  _id: string;
  arrival: string;
  departure: string;
  to: string;
  from: string;
  phoneDriver: string;
  driverName: string;
  seatsBooked: number[];
  journeyDate: IJourneyDate;
  fare: String;
  imagePath: String;
}

interface IJourneyDate {
  to: string;
  from: string;
}
