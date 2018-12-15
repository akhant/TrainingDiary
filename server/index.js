import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as route from './controllers';

dotenv.config();
const PORT = process.env.PORT || 3000;

// express
const app = express();

// mongodb
mongoose.connect(
  process.env.MONGODB_URL, { useNewUrlParser: true }
);

// middlewares
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/api/data', route.getData);
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
app.delete('/api/list/remove', route.removeFromList);
// server
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
