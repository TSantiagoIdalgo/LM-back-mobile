import userResolver from './user/userResolver';
import MusicResolver from './music/musicResolver';
import PlaylistResolver from './playlist/playlistResolver';

export const rootResolver = [userResolver, MusicResolver, PlaylistResolver];