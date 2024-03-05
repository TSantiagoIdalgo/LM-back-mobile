import { IUserProxy } from '../../types/user/userProxy';
import { IUser, IUserCreate, IUserHistory } from '../../types/user/userTypes';
import { GraphQLError } from 'graphql';
import UserService from '../../services/user/userService';
import HandleError from '../../helpers/error';
import { IToken, tokenVerify } from '../../helpers/token';
import { IMusic } from '../../types/music/music';

export default class UserProxy implements IUserProxy {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await this.userService.getAll();

      if (users.length === 0) 
        throw new HandleError(404, 'No users found', { 
          reason: 'There are no users in the database' 
        });

      return users;
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      if (!id) throw new HandleError(400, 'Id is required', { reason: 'Bad user input' });
      const user = await this.userService.getById(id);
      if (!user) throw new HandleError(404, 'User not found');

      return user;
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserLogin(email: string, password: string): Promise<IUser> {
    try {
      if (!email || !password) 
        throw new HandleError(400, 'All fields are required', { reason: 'Bad user input' });

      const user = await this.userService.login(email, password);
      if (!user) throw new HandleError(404, 'User not found');

      return user;
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserNetworkLogin(userName: string, email: string, image: string | null): Promise<string> {
    try {
      if (!userName || !email) 
        throw new HandleError(400, 'All fields are required', { reason: 'Bad user input' });
      return await this.userService.networkLogin(userName, email, image);

    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserMusic(context: IToken): Promise<IMusic[]> {
    const { token } = context;
    try {
      if (!token) 
        throw new HandleError(400, 'UNAUTHENTICATED', { reason: 'Token is undefined' });
      const { user } = tokenVerify(token);
      if (!user) 
        throw new HandleError(404, 'UNAUTHENTICATED', { reason: 'Invalid authentication token' });

      return await this.userService.getMusic(user);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserHistory(context: IToken): Promise<IUserHistory> {
    const { token } = context;
    try {
      if (!token) 
        throw new HandleError(400, 'Token is undefined', { reason: 'UNAUTHENTICATED' });
      const { user } = tokenVerify(token);
      if (!user) 
        throw new HandleError(404, 'Invalid authentication token', { reason: 'UNAUTHENTICATED' });

      return await this.userService.getHistory(user);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async userVerify(token: string | undefined): Promise<IUser> {
    try {
      if (!token) throw new HandleError(400, 'UNAUTHENTICATED', { reason: 'Token is undefined' });
      return await this.userService.verify(token);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async userCreate(user: IUserCreate): Promise<IUser> {
    try {
      if (!user.email || !user.userName || user.passwordHash) 
        throw new HandleError(400, 'All fields are required', { reason: 'Bad user input' });
      return await this.userService.create(user);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }
}