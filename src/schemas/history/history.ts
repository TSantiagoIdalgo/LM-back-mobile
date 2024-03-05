import { gql } from 'graphql-tag';

const HistorySchema = gql`
    type History {
        id: ID!
        userId: String!
        playlistId: String
        musicId: String
        albumId: String
        timestamp: String!
        music: Music
        playlist: Playlist
        album: Album
    }

    type UserHistory {
        user: User!
        history: [History]!
    }

    type Album {
        id: String
        name: String
        image: String
        author: String
        music: [Music]
    }
`;

export default HistorySchema;