export interface ICar {
    _id: string;
    name: string;
    typeCar: string;
    detail: string;
    imagePath: string;
    capacity: string;
    description: string;
    comment: IComment[];
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

export interface ITrip {
    _id: string;
    journeyDate: Date;
    journeyHour: string;
    line_id: string;
    car_id: string;
    driver1id: string;
    driver2id: string;
    seatsBooked: number[];
    fare: string;
    imagePath: string;
}

export interface ILine {
    _id: string;
    name_line: string;
    arrival: string;
    departure: string;
    to: string;
    from: string;
}

export interface IUser {
    _id: string;
    fullname: string;
    phone: string;
    address: string;
    username: string;
    info: string;
    salt: string;
    avatar: string;
    password: string;
    status: string;
    email: string;
}

export interface ICustomer {
    _id: string;
    fullname: string;
    phone: string;
    username: string;
    info: string;
    salt: string;
    avatar: string;
    password: string;
    email: string;
    comment: IComment[];
}

export interface ITicket {
    _id: string;
    customer_id: string;
    car_id: string;
    seat_no: number;
    status: string;
    payment: IPayment;
    isShuttle: boolean;
}

export interface IPayment {
    payment_id: string;
    payment_date: string;
    payment_code: string;
    fare: string;
}

export interface IDiscount {}
