import { IMusicProxy } from '../../types/music/musicProxy';
import { IMusic } from '../../types/music/music';
import { GraphQLError } from 'graphql';
import { IToken } from '../../helpers/token';
import { IAlbum } from '../../types/music/album';
import { saveDataHistory } from '../../helpers/saveHistory';
import MusicService from '../../services/music/musicService';
import HandleError from '../../helpers/error';

export default class MusicProxy implements IMusicProxy {
  private readonly musicService: MusicService;

  constructor(musicService: MusicService) {
    this.musicService = musicService;
  }

  async getAllOrPaginate(page: number | undefined, size: number | undefined): Promise<IMusic[]> {
    try {
      const users = await this.musicService.getAll(page, size);
  
      if (users.length === 0) 
        throw new HandleError(404, 'No music found', { 
          reason: 'There are no music in the database' 
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

  async getMusicById(id: string): Promise<IMusic> {
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'Id is required' });

      return await this.musicService.getByid(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getMusicByAlbum(): Promise<IAlbum[]> {
    try {
      const albums = await this.musicService.getAllByAlbum();
      if (albums.length === 0) 
        throw new HandleError(404, 'No album found', {
          reason: 'The album was not found' 
        });

      return albums;
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getAllMusicByAlbum(author: string, context: IToken): Promise<IAlbum[]> {
    const { token } = context;
    try {
      if (!author) throw new HandleError(400, 'Bad request', { reason: 'Author is required' });
      if (token) await saveDataHistory(token, 'albumId', author);

      const album = await this.musicService.getByAlbum(author);

      if (album.length === 0) 
        throw new HandleError(404, 'No album found', { reason: 'The album was not found' }); 

      return album;
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getMusicURL(id: string, context: IToken): Promise<string> {
    const { token } = context;
    try {
      if (token) saveDataHistory(token, 'musicId', id);
      return await this.musicService.getURL(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getMusicSearch(search: string): Promise<IMusic[]> {
    try {
      if (!search) throw new HandleError(400, 'Bad request', { reason: 'Search is required' });

      return await this.musicService.getSearch(search);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getMusicYoutubeInfo(id: string): Promise<IMusic> {
    try {
      if (!id) throw new HandleError(400, 'Bad request', { reason: 'Id is required' });

      return await this.musicService.getMusicInfo(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async uploadMusicByUrl(url: string, context: IToken): Promise<IMusic> {
    const { token } = context;
    try {
      if (!token) throw new HandleError(401, 'UNAUTHORIZED', { reason: 'Token is required' });

      return await this.musicService.uploadByUrl(url, token);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async deleteMusic(videoId: string, context: IToken): Promise<IMusic> {
    const { token } = context;
    try {
      if (!token) throw new HandleError(401, 'UNAUTHORIZED', { reason: 'Token is required' });

      return await this.musicService.delete(videoId, token);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }
}