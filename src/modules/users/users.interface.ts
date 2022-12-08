export default interface IUser {
    _id: string;
   name: string;
   phone: string;
   address: string;
   email: string;
   info: string;
   resetPasswordLink: string;
   isVerified: boolean;
   salt: string;
   date: Date;
   avatar: string;
   password: string;
} 