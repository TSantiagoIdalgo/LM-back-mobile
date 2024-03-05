import { IMusic } from '../../types/music/music';
import { IMusicService } from '../../types/music/musicService';
import { SERVICES_URI } from '../../config/serverConfig';
import { IError } from '../../helpers/error';
import { IAlbum } from '../../types/music/album';
import HandleError from '../../helpers/error';
import { IFile } from '../../types/file';

export default class MusicService implements IMusicService {

  async getAll(page: number | undefined, size: number | undefined): Promise<IMusic[]> {
    const response = await fetch(`${SERVICES_URI}/${page && size 
      ? `music?page=${page}&size=${size}`
      : 'music'}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic[]> = response.json();
    return data;
  }

  async getAllByAlbum(): Promise<IAlbum[]> {
    const response = await fetch(`${SERVICES_URI}/music/author`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IAlbum[]> = response.json();
    return data;
  }

  async getByAlbum(author: string): Promise<IAlbum[]> {
    const response = await fetch(`${SERVICES_URI}/music/author/${author}`);

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IAlbum[]> = response.json();
    return data;    
  }

  async getByid(id: string): Promise<IMusic> {
    const response = await fetch(`${SERVICES_URI}/music/unique/${id}`);
    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic> = response.json();
    return data;
  }

  async getURL(id: string): Promise<string> {
    const musicId = `${id.split('-').join('')}.mp3`;
    const response = await fetch(`${SERVICES_URI}/music/play/${musicId}`);

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    
    const data: Promise<string> = response.text();
    return data;  
  }

  async getMusicInfo(id: string): Promise<IMusic> {
    const response = await fetch(`${SERVICES_URI}/music/info/${id}`);

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic> = response.json();
    return data;  
  }

  async getSearch(search: string): Promise<IMusic[]> {
    const response = await fetch(`${SERVICES_URI}/music/search?search=${search}`);

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic[]> = response.json();
    return data;  
  }

  async uploadByUrl(url: string, token: string): Promise<IMusic> {
    const response = await fetch(`${SERVICES_URI}/music/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ id: url })
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic> = response.json();
    return data;   
  }

  async uploadByFile(file: IFile, token: string): Promise<IMusic> {
    const archivoBlob = new Blob([file.data], { type: file.mimetype });  

    const formData = new FormData();
    formData.append('files', archivoBlob, file.name);

    const response = await fetch(`${SERVICES_URI}/music/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': file.mimetype,
        'Authorization': token,
      },
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic> = response.json();
    return data;  
  }

  async delete(id: string, token: string): Promise<IMusic> {
    const response = await fetch(`${SERVICES_URI}/music/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      }
    });

    if (!response.ok) {
      const errorMessage: IError = JSON.parse(await response.text());
      throw new HandleError(response.status, response.statusText, { reason: errorMessage.error });
    }
    const data: Promise<IMusic> = response.json();
    return data;
  }
}