import { Model } from 'sequelize';
import { IMusic } from './music';

export interface IAlbum extends Model {
    id: string;
    name: string;
    image: string;
    author: string;
    musics: IMusic[];
}