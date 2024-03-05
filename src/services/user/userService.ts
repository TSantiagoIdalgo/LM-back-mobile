import { IUserService } from '../../types/user/userService';
import { IUser, IUserHistory, IUserCreate } from '../../types/user/userTypes';
import { IMusic } from '../../types/music/music';
import { SERVICES_URI } from '../../config/serverConfig';
import HandleError, { IError } from '../../helpers/error';

export default class UserService implements IUserService {

  async getAll(): Promise<IUser[]> {
    const response = await fetch(`${SERVICES_URI}/user`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IUser[]> = response.json();
    return data;
  }

  async getById(id: string): Promise<IUser | null> {
    const response = await fetch(`${SERVICES_URI}/user/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IUser> = response.json();
    return data;
  }
  
  async login(email: string, password: string): Promise<IUser | null> {
    const response = await fetch(`${SERVICES_URI}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, passwordHash: password })
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }

    const data: Promise<IUser> = response.json();
    return data;
  }

  async networkLogin(userName: string, email: string, image: string | null): Promise<string> {
    const response = await fetch(`${SERVICES_URI}/user/login/network`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, email, image })
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }

    const data: Promise<string> = response.json();
    return data;
  }

  async getMusic(id: string): Promise<IMusic[]> {
    const response = await fetch(`${SERVICES_URI}/user/music/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic[]> = response.json();
    return data;
  }

  async getHistory(id: string): Promise<IUserHistory> {
    const response = await fetch(`${SERVICES_URI}/user/history/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IUserHistory> = response.json();
    return data;
  }

  async verify(token: string): Promise<IUser> {
    const response = await fetch(`${SERVICES_URI}/user/${token}`, {
      method: 'PUT'
    });
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IUser> = response.json();
    return data;
  }

  async create(user: IUserCreate): Promise<IUser> {
    const response = await fetch(`${SERVICES_URI}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }

    const data: Promise<IUser> = response.json();
    return data;
  }
}