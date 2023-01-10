export interface DataStoredInToken {
    id: string;
}
export interface TokenData {
    accessToken: string;
    expiredAt: number;
}

export interface IProfile {
    fullname: string;
    username: string;
    avatar: string;
    phone: string;
}
