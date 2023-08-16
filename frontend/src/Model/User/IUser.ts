export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    auth: {
        token: string
        refresh: string
    };
} 