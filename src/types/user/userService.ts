import { IUser, IUserHistory, IUserCreate } from './userTypes';
import { IMusic } from '../music/music';

export interface IUserService {
    getAll(): Promise<IUser[]>
    getById(id: string): Promise<IUser | null>
    login(email: string, password: string): Promise<IUser | null>
    networkLogin(userName: string, email: string, image: string | null): Promise<string>
    getMusic(id: string): Promise<IMusic[]>
    getHistory(id: string): Promise<IUserHistory>
    verify(token: string): Promise<IUser>
    create(user: IUserCreate): Promise<IUser>
}