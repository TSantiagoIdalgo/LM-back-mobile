import { IMusic } from './music';
import { IAlbum } from './album';
import { IToken } from '../../helpers/token';

export interface IMusicProxy {
    getAllOrPaginate(page: number | undefined, size: number | undefined): Promise<IMusic[]>;
    getMusicById(id: string): Promise<IMusic>;
    getMusicByAlbum(): Promise<IAlbum[]>;
    getAllMusicByAlbum(author: string, context: IToken): Promise<IAlbum[]>
    getMusicURL(id: string, context: IToken): Promise<string>
    getMusicYoutubeInfo(id: string): Promise<IMusic>
    getMusicSearch(search: string): Promise<IMusic[]>
    uploadMusicByUrl(url: string, context: IToken): Promise<IMusic>
    deleteMusic(videoId: string, context: IToken): Promise<IMusic>
}