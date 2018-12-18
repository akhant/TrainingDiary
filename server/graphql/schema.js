const typeDefs = `

type User {
    username: String!
    confirmed: String!
    userId: ID
}

type Token {
    token: String!
}

type Query {
    getCurrentUser: User
}

type Mutation {
    signinUser(email: String! password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
}
`;

export default typeDefs;
