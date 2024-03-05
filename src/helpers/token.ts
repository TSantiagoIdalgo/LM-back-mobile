import jwt from 'jsonwebtoken';
import { IUser } from '../types/user/userTypes';
import { API_SECRET } from '../config/serverConfig';
import { GraphQLError } from 'graphql';
import HandleError from './error';

export interface IToken {
    tokenVerify(): string
    token: string | undefined
}

export const tokenVerify = (token: string | undefined) => {
  if (!token) {
    throw new HandleError(400, 'UNAUTHENTICATED', { 
      reason: 'An authentication token was not provided' });
  }

  if (!token.toLowerCase().startsWith('bearer ')) {
    throw new HandleError(400, 'UNAUTHENTICATED', { 
      reason: 'An authentication token was not provided' });
  }

  const authorizationHeader = token.slice(7);
  try {
    const decoded = jwt.verify(authorizationHeader, API_SECRET) as IUser;
    return { user: decoded.email };
  } catch (error) {
    if (error instanceof HandleError) 
      throw new GraphQLError(`${error.message} - ${error.data}`, {
        extensions: { code: error.code }
      });
    else throw new GraphQLError(error.message);
  }
};