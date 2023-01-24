export default interface ICar {
    name: string;
    typeCar: string;
    detail: string;
    imagePath: string;
    licensePlate: string;
    capacity: string;
    description: string;
    driver_id: string;
    driver2_id: string;
    comment: Array<IComment>;
    status: string;
}
export interface IComment {
    _id: string;
    user: string;
    text: string;
    star: number;
    avatar: string;
    date: Date;
}
