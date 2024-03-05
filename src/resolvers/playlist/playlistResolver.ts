import PlaylistProxy from '../../proxies/playlist/playlistProxy';
import PlaylistService from '../../services/playlist/playlistService';
import { IPlaylist, IPlaylistInteraction, IPlaylistPaginate, IPlaylistMusicAction } from '../../types/playlist/playlist';
import { IToken } from '../../helpers/token';

const playlistService = new PlaylistService();
const playlistProxy = new PlaylistProxy(playlistService);


const PlaylistResolver = {
  Query: {
    getAllPlaylist: async (_root: IPlaylistPaginate, args: IPlaylistPaginate) =>
      await playlistProxy.getAllPlaylistOrPagine(args.size, args.page),
    getPlaylistById: async (_root: IPlaylist, args: IPlaylist) =>
      await playlistProxy.getPlaylistById(args.id),
    getUserPlaylist: async (_root: IPlaylist, _args: IPlaylist, context: IToken ) =>
      await playlistProxy.getUserPlaylist(context),
    getPlaylistMusic: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await playlistProxy.getPlaylistMusic(args.id, context),
    getPlaylistLikes: async (_root: IPlaylist, args: IPlaylist) =>
      await playlistProxy.getPlaylistLikes(args.id),
    getUserLikes: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await playlistProxy.getUserLikes(args.id, context),
  },
  Mutation: {
    createPlaylist: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await playlistProxy.createPlaylist(args.data, context),
    addMusicToPlaylist: async (_root: IPlaylistMusicAction, args: IPlaylistMusicAction) =>
      await playlistProxy.addMusicToPlaylist(args.musicId, args.playlistId),
    removeMusicFromPlaylist: async (_root: IPlaylistMusicAction, args: IPlaylistMusicAction) =>
      await playlistProxy.removeMusicFromPlaylist(args.musicId, args.playlistId),
    updatePlaylist: async (_root: IPlaylist, args: IPlaylist) =>
      await playlistProxy.updatePlaylist(args.id, args.data),
    deletePlaylist: async (_root: IPlaylist, args: IPlaylist, context: IToken) =>
      await playlistProxy.deletePlaylist(args.id, context),
    updateLikes: async (_root: IPlaylistInteraction, args: IPlaylistInteraction, context: IToken) =>
      await playlistProxy.updateLike(args.playlistId, args.action, context)
  }
};
  
export default PlaylistResolver;