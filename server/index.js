import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import graphqlHTTP from 'express-graphql';
import jwt from 'jsonwebtoken'
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import User from './models/user';
import TrainingDate from './models/date';
import Exercise from './models/exercise';
import Approach from './models/approach';
import Statistic from './models/statistic';
import List from './models/list';

dotenv.config();
const PORT = process.env.PORT || 3000;

// express
const app = express();

// mongodb
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true }
);

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.JWT_SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});
const schema = makeExecutableSchema({ typeDefs, resolvers });
app.use(
  '/graphql',
  graphqlHTTP(({ currentUser }) => ({
    schema,
    context: {
      currentUser,
      User,
      List,
      TrainingDate,
      Exercise,
      Approach,
      Statistic,
    },
    graphiql: true,
  }))
);

// server
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
