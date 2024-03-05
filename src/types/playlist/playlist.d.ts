import { IMusic } from './music';

type IPlaylistAction = 'like' | 'dislike';

export interface IPlaylistInteraction {
    like: boolean;
    dislike: boolean;
    playlistId: string;
    userId: string;
    action: IPlaylistAction;
}

export interface IPlaylistMusicAction {
    playlistId: string;
    musicId: string;
    userId: string;
}

export interface IPlaylist {
    id: string;
    tittle: string;
    description: string;
    userId: string;
    likes: number;
    dislikes: number;
    music: IMusic[];
    data: IPlaylist
}

export interface IPlaylistPaginate {
    size?: number,
    page?: number,
}