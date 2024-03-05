import { gql } from 'graphql-tag';

const musicSchema = gql`
    type Music {
        id: String
        name: String
        author: String
        album: String
        size: Int
        duration: Float
        image: String
        userId: String
    }

    extend type Query {
        getAllMusicOrPagine(page: Int, size: Int): [Music]
        getMusicByAlbum: [Album]
        getAllMusicByAlbum(album: String!): Album
        getMusicById(id: String!): Music
        getMusicSearch(search: String!): [Music]
        getMusicURL(id: String!): String
        getMusicYoutubeInfo(id: String!): Music
    }

    extend type Mutation {
        uploadMusicByUrl(id: String!): Music
        deleteMusic(id: String!): Music
    }
`;

export default musicSchema;