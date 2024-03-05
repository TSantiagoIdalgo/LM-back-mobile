import { IPlaylist, IPlaylistAction, IPlaylistInteraction } from '../../types/playlist/playlist';
import { SERVICES_URI } from '../../config/serverConfig';
import { IPlaylistService } from '../../types/playlist/playlistService';
import HandleError, { IError } from '../../helpers/error';

export default class PlaylistService implements IPlaylistService {

  async getAll(size: number | undefined, page: number | undefined): Promise<IPlaylist[]> {
    const response = await fetch(`${SERVICES_URI}/${page && size 
      ? `playlist?page=${page}&size=${size}`
      : 'playlist'}`);

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }

    const data: Promise<IPlaylist[]> = response.json();
    
    return data;
  }

  async getById(id: string): Promise<IPlaylist> {
    const response = await fetch (`${SERVICES_URI}/playlist/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }

    const data: Promise<IPlaylist> = response.json();

    return data;
  }

  async getUser(userId: string): Promise<IPlaylist[]> {
    const response = await fetch(`${SERVICES_URI}/playlist/user/${userId}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylist[]> = response.json();
  
    return data;
  }

  async getMusic(id: string): Promise<IPlaylist> {
    const response = await fetch(`${SERVICES_URI}/playlist/music/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    
    const data: Promise<IPlaylist> = response.json();
    
    return data;
  }

  async getLikes(id: string): Promise<IPlaylistInteraction[]> {
    const response = await fetch(`${SERVICES_URI}/playlist/likes/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
      
    const data: Promise<IPlaylistInteraction[]> = response.json();
      
    return data;
  }

  async getUserLikes(userId: string, id: string): Promise<IPlaylistInteraction> {
    const response = await fetch(`${SERVICES_URI}/playlist/user/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId, playlistId: id })
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylistInteraction> = response.json();
    return data;
  }
    
  async create(playlist: IPlaylist): Promise<IPlaylist> {
    const response = await fetch(`${SERVICES_URI}/playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlist)
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylist> = response.json();
    return data;
  }

  async update(id: string, playlist: IPlaylist): Promise<IPlaylist> {
    const response = await fetch(`${SERVICES_URI}/playlist/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlist)
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylist> = response.json();
    return data;
  }

  async delete(id: string): Promise<IPlaylist> {
    const response = await fetch(`${SERVICES_URI}/playlist/${id}`, {
      method: 'DELETE',
    }); 

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylist> = response.json();
    return data;
  }

  async addMusic(id: string, musicId: string): Promise<IPlaylist> {
    const body = {
      musicId: musicId,
      playlistId: id
    };

    const response = await fetch(`${SERVICES_URI}/playlist/music`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylist> = response.json();
    return data;
  }

  async remove(id: string, musicId: string): Promise<IPlaylist> {
    const response = await fetch(`${SERVICES_URI}/playlist/playlist/${musicId}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylist> = response.json();
    return data;
  }

  async updateLike(id: string, userId: string, like: IPlaylistAction): Promise<IPlaylistInteraction> {
    const body = {
      playlistId: id,
      userId: userId,
      action: like
    };
    const response = await fetch(`${SERVICES_URI}/playlist/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
  
    const data: Promise<IPlaylistInteraction> = response.json();
    return data;
  }
}