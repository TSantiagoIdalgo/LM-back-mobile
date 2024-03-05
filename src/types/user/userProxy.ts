import { IUser, IUserHistory, IUserCreate } from './userTypes';
import { IMusic } from '../music/music';
import { IToken } from '../../helpers/token';

export interface IUserProxy {
    getAllUsers(): Promise<IUser[]>
    getUserById(id: string): Promise<IUser>
    getUserLogin(email: string, password: string): Promise<IUser>
    getUserNetworkLogin(userName: string, email: string, image: string | null): Promise<string>
    getUserMusic(context: IToken): Promise<IMusic[]>
    getUserHistory(context: IToken): Promise<IUserHistory>
    userVerify(token: string): Promise<IUser>
    userCreate(user: IUserCreate): Promise<IUser>
}