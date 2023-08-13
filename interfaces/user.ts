export interface IUser {
    _id      : string;
    name     : string;
    email    : string;
    password?: string;
    role     : string;
    address?: string;
    image?: string | null | undefined;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
}