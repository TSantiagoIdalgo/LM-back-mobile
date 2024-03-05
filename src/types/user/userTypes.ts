import { IMusic } from '../music/music';
import { IPlaylist } from '../playlist/playlist';
import { IAlbum } from '../music/album';

type TUserId = `${string}-${string}-${string}-${string}-${string}`

export interface IUser {
    id: TUserId | string;
    userName: string;
    email: string;
    passwordHash: string;
    token?: string;
    verify?: boolean;
    image: string | null;
}

export interface IUserHistory {
    user: IUser;
    history: {
      id: string
      userId: string
      musicId: string
      playlistId: string
      timestamp: Date
      music?: IMusic[]
      playlist?: IPlaylist
      album?: IAlbum
    }
}

export interface IUserCreate {
  userName: string;
  email: string;
  passwordHash: string;
}