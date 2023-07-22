export interface IUser {
    _id      : string;
    name     : string;
    email    : string;
    password?: string;
    role     : string;
    address?: string;

    createdAt?: string;
    updatedAt?: string;
}