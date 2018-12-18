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
import Date from './models/date';
import Exercise from './models/exercise';
import Approach from './models/approach';
import Statistic from './models/statistic';
import List from './models/listOfExercises';

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
  if (token !== 'null') {
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
      Date,
      Exercise,
      Approach,
      Statistic,
    },
    graphiql: true,
  }))
);

// routes
/* app.get('/api/data', route.getData);
app.post('/api/data', route.addExercise);
app.post('/api/drop', route.dropDatabase);
app.post('/api/deleteEx', route.deleteExercise);
app.post('/api/changeName', route.changeName);
app.post('/api/addApproach', route.addApproach);
app.post('/api/deleteApproach', route.deleteApproach);
app.post('/api/changeApproach', route.changeApproach);
app.post('/api/workoutStart', route.workoutStart);
app.post('/api/workoutFinish', route.workoutFinish);
app.post('/api/users', route.userSignup);
app.post('/api/auth', route.userLogin);
app.get('/confirmation/:token', route.userConfirmServer);
app.post('/api/confirmation', route.userConfirm);
app.post('/api/reset_password_request', route.resetPasswordRequest);
app.get('/reset_password_request/:token', route.resetPasswordRequestServer);
app.post('/api/reset_password', route.resetPassword);
app.post('/api/list/get', route.getList);
app.put('/api/list/add', route.addToList);
app.post('/api/list/update', route.changeList);
app.delete('/api/list/remove', route.removeFromList); */
// server
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
