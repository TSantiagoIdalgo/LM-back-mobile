import { gql } from 'graphql-tag';
import UserSchema from './user/userSchema';
import musicSchema from './music/musicSchema';
import playlistSchema from './playlist/playlistSchema';
import HistorySchema from './history/history';

const rootSchema = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

export const typeDefs = [rootSchema, UserSchema, musicSchema, playlistSchema, HistorySchema];