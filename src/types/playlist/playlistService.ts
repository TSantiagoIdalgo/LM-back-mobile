import { IPlaylist, IPlaylistInteraction, IPlaylistAction } from './playlist';

export interface IPlaylistService {
    getAll(size: number | undefined, page: number | undefined): Promise<IPlaylist[]>;
    getById(id: string): Promise<IPlaylist>;
    getUser(userId: string): Promise<IPlaylist[]>;
    getMusic(id: string): Promise<IPlaylist>;
    getLikes(id: string): Promise<IPlaylistInteraction[]>
    getUserLikes(userId: string, id: string): Promise<IPlaylistInteraction>;
    create(playlist: IPlaylist): Promise<IPlaylist>;
    update(id: string, playlist: IPlaylist): Promise<IPlaylist>;
    delete(id: string): Promise<IPlaylist>;
    addMusic(id: string, musicId: string): Promise<IPlaylist>;
    remove(id: string, musicId: string): Promise<IPlaylist>;
    updateLike(id: string, userId: string, like: IPlaylistAction): Promise<IPlaylistInteraction>;
}