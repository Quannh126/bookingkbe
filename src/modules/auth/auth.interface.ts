export interface DataStoredInToken {
    id: string;
    role: string;
}

export interface DataStoredInTokenRefresh {
    id: string;
}
export interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
}
export interface AccessTokenData {
    accessToken: string;
    expiredAt: number;
}

// export enum ROLES {
//     "ADMIN",
//     "MANAGER",
//     "TICKETING_STAFF",
//     "USER",
// }
export interface IProfile {
    fullname: string;
    username: string;
    role: string;
    avatar: string;
    phone: string;
}
