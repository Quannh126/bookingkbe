export default interface ICar {
    name: string;
    type_car: string;

    // attachment: Array<File>;
    license_plate: string;
    capacity: string;
    description: string;
    driver_name: string;
    phonenumber: string;
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
