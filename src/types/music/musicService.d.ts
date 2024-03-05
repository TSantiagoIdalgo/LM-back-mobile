import { IMusic, IFile } from './music';
import { IAlbum } from './album';

export interface IMusicService {
    getAll(page: number | undefined, size: number | undefined): Promise<IMusic[]>
    getByid(id: string): Promise<IMusic>
    getAllByAlbum(): Promise<IAlbum[]>
    getByAlbum(author: string, token: string | undefined): Promise<IAlbum[]>
    getURL(id: string, token: string | undefined): Promise<string>
    getMusicInfo(id: string): Promise<IMusic>
    getSearch(search: string): Promise<IMusic[]>
    uploadByUrl(url: string, token: string): Promise<IMusic>
    uploadByFile(file: IFile, token: string): Promise<IMusic>
    delete(id: string, token: string): Promise<IMusic>
}