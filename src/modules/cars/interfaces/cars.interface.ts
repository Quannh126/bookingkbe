export default interface ICar {
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
