import { IUser } from './user';
export interface ISession {
    user: IUser;
    expires: string;
    accessToken: string | undefined;
}