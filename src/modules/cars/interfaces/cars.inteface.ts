import { ITrip } from "./trip.interface";

export default interface ICar {
    name: string;
    type: string;
    policy: string;
    detail:string;
    company:string;
    imagePath: string;
    fare:string;
    capacity:string;
    trips: ITrip[];
}

