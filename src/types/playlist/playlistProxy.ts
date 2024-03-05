import { IPlaylist, IPlaylistInteraction, IPlaylistAction } from './playlist';
import { IToken } from '../../helpers/token';

export interface IPlaylistProxy {
    getAllPlaylistOrPagine(size: number | undefined, page: number | undefined): Promise<IPlaylist[]>;
    getPlaylistById(id: string): Promise<IPlaylist>;
    getUserPlaylist(context: IToken): Promise<IPlaylist[]>;
    getPlaylistMusic(id: string, context: IToken): Promise<IPlaylist>;
    getPlaylistLikes(id: string): Promise<IPlaylistInteraction[]>;
    getUserLikes(id: string, context: IToken): Promise<IPlaylistInteraction>;
    createPlaylist(playlist: IPlaylist, context: IToken): Promise<IPlaylist>;
    updatePlaylist(id: string, playlist: IPlaylist): Promise<IPlaylist>;
    deletePlaylist(id: string, context: IToken): Promise<IPlaylist>;
    addMusicToPlaylist(id: string, musicId: string): Promise<IPlaylist>;
    removeMusicFromPlaylist(id: string, musicId: string): Promise<IPlaylist>;
    updateLike(id: string, like: IPlaylistAction, context: IToken): Promise<IPlaylistInteraction>;
}