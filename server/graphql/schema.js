const typeDefs = `

type User {
    username: String!
    email: String!
    confirmed: String!
    userId: ID!
}

type Exercise {
    dateId: ID!
    userId: ID!
    exerciseId: ID!
    exerciseName: String!
    date: String
}

type Approach {
    userId: ID!
    exerciseId: ID!
    dateId: ID!
    approachId: ID
    value: String!
    approachNumber: Int
    exerciseName: String
    date: String!
    exerciseTime: Int
    restTime: Int
    timeFromStart: Int
    weight: Int
}

type Data {
    dateId: ID!
    date: String!
    exercises: [Exercise]!
    approaches: [Approach]!
    list: [ExerciseDescription]!
    statistic: [Statistic]
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

type Statistic {
    userId: ID!
    date: String!
    workoutStart: String
    workoutFinish: String
    workoutTime: String

}

type Query {
    getCurrentUser: User
    getList: List
    getExercises: Data
    getAllStatisticData: Data
    getDayData(date: String!): Data
}

type Mutation {
    signinUser(email: String! password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
    addToList(exerciseName: String!, weightFrom: Int, weightTo: Int): ExerciseDescription
    removeFromList(exerciseDescriptionId: ID!): ExerciseDescription
    changeList(exerciseDescriptionId: ID!,exerciseName: String!, weightFrom: Int, weightTo: Int): ExerciseDescription
    addExercise(date: String!): Exercise
    removeExercise(exerciseId: ID!): Exercise
    changeSelectExerciseName(exerciseId: ID!, exerciseName: String!): Exercise
    addApproach(exerciseId: ID!, startApproachTime: String!): Approach
    removeApproach(approachId: ID!): Approach
    changeApproachValue(approachId: ID!, value: String!, finishApproachTime: String!): Approach
    changeApproachWeight(approachId: ID!, weight: Int!): Approach
    workoutStart(workoutStart: String!): Statistic
    workoutFinish(workoutFinish: String!): Statistic
}
`;

export default typeDefs;
