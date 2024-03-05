import { IToken, tokenVerify } from '../../helpers/token';
import PlaylistService from '../../services/playlist/playlistService';
import { IPlaylist, IPlaylistInteraction, IPlaylistAction } from '../../types/playlist/playlist';
import { IPlaylistProxy } from '../../types/playlist/playlistProxy';
import { GraphQLError } from 'graphql';
import HandleError from '../../helpers/error';
import { saveDataHistory } from '../../helpers/saveHistory';

export default class PlaylistProxy implements IPlaylistProxy {
  private readonly playlistService: PlaylistService;

  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService;
  }

  async getAllPlaylistOrPagine(size: number | undefined, page: number | undefined): Promise<IPlaylist[]> {
    try {
      const playlists = await this.playlistService.getAll(size, page);

      if (playlists.length === 0) 
        throw new HandleError(404, 'No music found', { 
          reason: 'There are no music in the database' 
        });
  
      return playlists;
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getPlaylistById(id: string): Promise<IPlaylist> {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });

      return await this.playlistService.getById(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserPlaylist(context: IToken): Promise<IPlaylist[]> {
    const { token } = context;

    try {
      if (!token) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The token is required' });
      const { user } = tokenVerify(token);

      return await this.playlistService.getUser(user);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getPlaylistMusic(id: string, context: IToken): Promise<IPlaylist> {
    const { token } = context;
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });
      if (token) await saveDataHistory(token, 'playlistId', id);

      return await this.playlistService.getMusic(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getPlaylistLikes(id: string): Promise<IPlaylistInteraction[]> {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });
      return await this.playlistService.getLikes(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async getUserLikes(id: string, context: IToken): Promise<IPlaylistInteraction> {
    const { token } = context;
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });
      const { user } = tokenVerify(token);

      return await this.playlistService.getUserLikes(user, id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async createPlaylist(playlist: IPlaylist, context: IToken): Promise<IPlaylist> {
    const { token } = context;
    try {
      if (!token) throw new HandleError(400, 'UNAUTHENTICATED', { reason: 'The token is required' });
      const { user } = tokenVerify(token);
      
      return await this.playlistService.create({ ...playlist, userId: user }); 
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async updatePlaylist(id: string, playlist: IPlaylist): Promise<IPlaylist> {
    try {
      if (!id) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });
        
      return await this.playlistService.update(id, playlist);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async deletePlaylist(id: string, context: IToken): Promise<IPlaylist> {
    const { token } = context;
    try {
      if (!token) throw new HandleError(400, 'UNAUTHENTICATED', { reason: 'The token is required' });
      const { user } = tokenVerify(token);
      if (!user) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The user is required' });

      return await this.playlistService.delete(id);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }
  
  async addMusicToPlaylist(id: string, musicId: string): Promise<IPlaylist> {
    try {
      if (!id || !musicId) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });
        
      return await this.playlistService.addMusic(id, musicId);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }
  
  async removeMusicFromPlaylist(id: string, musicId: string): Promise<IPlaylist> {
    try {
      if (!id || !musicId) throw new HandleError(400, 'BAD_REQUEST', { reason: 'The id is required' });
          
      return await this.playlistService.remove(id, musicId);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }

  async updateLike(id: string, like: IPlaylistAction, context: IToken): Promise<IPlaylistInteraction> {
    const { token } = context;
    try {
      if (!token) throw new HandleError(400, 'UNAUTHENTICATED', { reason: 'The token is required' });
      const { user } = tokenVerify(token);

      return await this.playlistService.updateLike(id, user, like);
    } catch (error) {
      if (error instanceof HandleError) 
        throw new GraphQLError(`${error.message} ${error.data ? `- ${error.data.reason}` : null}`, {
          extensions: { code: error.code }
        });
      else throw new GraphQLError(error.message);
    }
  }
    
}