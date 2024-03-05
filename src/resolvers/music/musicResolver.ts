import MusicProxy from '../../proxies/music/musicProxy';
import MusicService from '../../services/music/musicService';
import { IMusicInput, IMusic } from '../../types/music/music';
import { IAlbum } from '../../types/music/album';
import { IToken } from '../../helpers/token';

const musicService = new MusicService();
const musicProxy = new MusicProxy(musicService);

const MusicResolver = {
  Query: {
    getAllMusicOrPagine: async (_root: IMusicInput, args: IMusicInput): Promise<IMusic[]> => 
      await musicProxy.getAllOrPaginate(args.page, args.size),
    getMusicByAlbum: async (): Promise<IAlbum[]> =>
      await musicProxy.getMusicByAlbum(),
    getAllMusicByAlbum: async (_root: IMusic, args: IMusic, context: IToken): Promise<IAlbum[]> =>
      await musicProxy.getAllMusicByAlbum(args.album, context),
    getMusicById: async (_root: IMusic, args: IMusic): Promise<IMusic> =>
      await musicProxy.getMusicById(args.id),
    getMusicSearch: async (_root: IMusicInput, args: IMusicInput): Promise<IMusic[]> =>
      await musicProxy.getMusicSearch(args.search),
    getMusicURL: async (_root: IMusic, args: IMusic, context: IToken): Promise<string> =>
      await musicProxy.getMusicURL(args.id, context),
    getMusicYoutubeInfo: async (_root: IMusic, args: IMusic): Promise<IMusic> =>
      await musicProxy.getMusicYoutubeInfo(args.id)
  },
  Mutation: {
    uploadMusicByUrl: async (_root: IMusic, args: IMusic, context: IToken): Promise<IMusic> =>
      await musicProxy.uploadMusicByUrl(args.id, context),
    deleteMusic: async (_root: IMusic, args: IMusic, context: IToken): Promise<IMusic> =>
      await musicProxy.deleteMusic(args.id, context) ,
  }
};

export default MusicResolver;