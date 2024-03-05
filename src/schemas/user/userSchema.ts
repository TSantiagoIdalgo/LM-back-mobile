import { gql } from 'graphql-tag';

const UserSchema = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        passwordHash: String!
        token: String
        image: String
        verify: Boolean!
    }
    
    input UserInput {
        userName: String!
        email: String!
        passwordHash: String!
    }

    extend type Query {
        getAllUser: [User]
        getUserById(id: ID!): User
        userLogin(email: String!, passwordHash: String!): User
        userNetworkLogin(userName: String!, email: String!, image: String): String!
        getUserMusic: [Music]
        getUserHistory: UserHistory
    }

    extend type Mutation {
        createUser(userName: String!, email: String!, passwordHash: String!): User
        verifyUser(token: String!): User
    }
`;

export default UserSchema;