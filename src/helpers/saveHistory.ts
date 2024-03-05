import { tokenVerify } from './token';
import { SERVICES_URI } from '../config/serverConfig';

type IKey = 'albumId' | 'musicId' | 'playlistId'

export const saveDataHistory = async (token: string, key: IKey, value: string): Promise<string> => {
  const { user } = tokenVerify(token);
  await fetch(`${SERVICES_URI}/user/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [key]: value, userId: user })
  });

  return user;
};