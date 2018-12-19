const typeDefs = `

type User {
    username: String!
    email: String!
    confirmed: String!
    userId: ID!
}

type Token {
    token: String!
}

type ExerciseDescription {
    userId: ID!
    exerciseName: String!
    weightFrom: Int
    weightTo: Int
    exerciseDescriptionId: ID!
}

type List {
    userId: ID!
    list: [ExerciseDescription]!
}

type Query {
    getCurrentUser: User
    getList: List
}

type Mutation {
    signinUser(email: String! password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
    addToList(exerciseName: String!, weightFrom: Int, weightTo: Int): ExerciseDescription
    removeFromList(exerciseDescriptionId: ID!): ExerciseDescription
    changeList(exerciseDescriptionId: ID!, exerciseName: String!, weightFrom: Int, weightTo: Int): ExerciseDescription
}
`;

export default typeDefs;
