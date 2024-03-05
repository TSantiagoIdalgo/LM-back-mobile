import { gql } from 'graphql-tag';

const playlistSchema = gql`
    type Playlist {
        id: ID!
        tittle: String!
        description: String!
        userId: String!
        likes: Int!
        dislikes: Int!
        music: [Music]
    }

    type PlaylistAction {
        playlistId: ID!
        userId: String!
        like: Int!
        dislike: Int!
    }

    type PlaylistLike {
        playlistId: ID!
        userId: String!
        like: Boolean!
        dislike: Boolean!
    }

    input PlaylistInput {
        tittle: String
        description: String
    }

    extend type Query {
        getAllPlaylist(size: Int, page: Int): [Playlist]
        getPlaylistById(id: String!): Playlist
        getUserPlaylist: [Playlist]
        getPlaylistMusic(id: String!): Playlist
        getPlaylistLikes(id: String!): [User]
        getUserLikes(id: String!): PlaylistLike
    }

    extend type Mutation {
        createPlaylist(data: PlaylistInput): Playlist
        addMusicToPlaylist(musicId: String!, playlistId: String!): Music
        removeMusicFromPlaylist(musicId: String!, playlistId: String!): Music
        updatePlaylist(id: String!, data: PlaylistInput): Playlist
        deletePlaylist(id: String!): Playlist
        updateLikes(playlistId: String!, action: String!): PlaylistAction
    }
`;

export default playlistSchema;