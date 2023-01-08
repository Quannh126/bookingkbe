export default interface IUser {
    _id: string;
    fullname: string;
    phone: string;
    username: string;
    info: string;
    resetPasswordLink: string;
    isVerified: boolean;
    salt: string;
    date: Date;
    avatar: string;
    password: string;
    status: string;
}
