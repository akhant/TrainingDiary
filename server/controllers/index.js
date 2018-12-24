import jwt from 'jsonwebtoken';
import TrainingDate from '../models/date';
import Exercise from '../models/exercise';
import Approach from '../models/approach';
import Statistic from '../models/statistic';
import User from '../models/user';
import parseErrors from '../utils/parseErrors';

import { sendConfirmationEmail, sendResetPasswordEmail } from '../mailer';

export function getData(req, res) {
  TrainingDate.find({}).exec((err, date) => {
    Exercise.find({}, (err, exercises) => {
      Approach.find({}, (err, approaches) => {
        Statistic.find({}, (err, statistic) => {
          res.json({
            date,
            exercises,
            approaches,
            statistic,
          });
        });
      });
    });
  });
}

export function addExercise(req, res) {
  // если уже есть документ, с датой из req.body.date, то создать exercise и вернуть его в ответе
  // если документа нет, то создать его и  exercise, вернуть оба документа в ответе
  TrainingDate.count({ date: req.body.date }).then((count) => {
    if (count === 0) {
      const date = new TrainingDate({ date: req.body.date });

      const exercise = new Exercise({
        dateId: date._id,
        exerciseName: 'Подъем гантели в наклоне',
        date: req.body.date,
      });

      date.save((err, newDate) => {
        exercise.save((newExercise) => res.json({ newDate, newExercise }));
      });
    } else {
      const exercise = new Exercise({
        dateId: req.body.dateId,
        exerciseName: 'Подъем гантели в наклоне',
        date: req.body.date,
      });
      exercise.save((err, newExercise) => res.json(newExercise));
    }
  });
}

export function dropDatabase(req, res) {
  TrainingDate.findOneAndRemove({ date: req.body.date }, (err, removedDate) => {
    Exercise.find({ date: req.body.date }, (err, removedExercises) => {
      Exercise.remove({ date: req.body.date }, (err) => {
        Approach.find({ date: req.body.date }, (err, removedApproaches) => {
          Approach.remove({ date: req.body.date }, err => res.json({ removedDate, removedExercises, removedApproaches }));
        });
      });
    });
  });
}

export function deleteExercise(req, res) {
  Exercise.findOneAndRemove(
    { _id: req.body.exerciseId },
    (err, removedExercise) => {
      Approach.find(
        { exerciseId: req.body.exerciseId },
        (err, removedApproaches) => {
          Approach.remove({ exerciseId: req.body.exerciseId }, err => res.json({ removedExercise, removedApproaches }));
        }
      );
    }
  );
}

export function changeName(req, res) {
  Exercise.findOne({ _id: req.body.exerciseId }, (err, exercise) => {
    exercise.set({
      exerciseName: req.body.exerciseName,
    });
    exercise.save((err, updatedExercise) => {
      Approach.find({ exerciseId: req.body.exerciseId }, (err, approaches) => {
        approaches.map((approach) => {
          approach.set({
            exerciseName: req.body.exerciseName,
          });
          return approach.save();
        });

        try {
          return res.json({ updatedExercise, approaches });
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
}

export function addApproach(req, res) {
  Approach.count({ date: req.body.date }, (err, count) => {
    if (count) {
      Approach.find({ _id: req.body.approachId })
        .sort({ _id: -1 })
        .limit(1)
        .exec((err, oldApproach) => {
          const approach = new Approach({
            dateId: req.body.dateId,
            date: req.body.date,
            exerciseId: req.body.exerciseId,
            exerciseName: req.body.exerciseName,
          });
          approach.save((err, newApproach) => res.json({ newApproach, oldApproach }));
        });
    } else {
      const approach = new Approach({
        dateId: req.body.dateId,
        date: req.body.date,
        exerciseId: req.body.exerciseId,
        exerciseName: req.body.exerciseName,
      });
      approach.save((err, newApproach) => res.json(newApproach));
    }
  });
}

export function deleteApproach(req, res) {
  Approach.findOneAndRemove(
    { _id: req.body.approachId },
    (err, deletedApproach) => res.json(deletedApproach)
  );
}

export function changeApproach(req, res) {
  Approach.findOne({ _id: req.body.approachId }, (err, approach) => {
    approach.set({
      value: req.body.approachValue,
      exerciseTime: req.body.exerciseTime,
      restTime: req.body.restTime,
      weight: req.body.weight,
    });

    approach.save((err, changedApproach) => res.json(changedApproach));
  });
}

export function workoutStart(req, res) {
  Statistic.findOne({ date: req.body.date }, (err, date) => {
    if (date) {
      date.set({
        workoutStart: req.body.workoutStart,
      });
      date.save((err, statistic) => res.json(statistic));
    } else {
      const statistic = new Statistic({
        date: req.body.date,
        workoutStart: req.body.workoutStart,
      });
      statistic.save((err, statistic) => res.json(statistic));
    }
  });
}

export function workoutFinish(req, res) {
  Statistic.findOne({ date: req.body.date }, (err, statistic) => {
    const { workoutFinish } = req.body;

    const workoutTime = Math.ceil(
      (workoutFinish - statistic.workoutStart) / 1000
    );

    statistic.set({
      workoutFinish,
      workoutTime,
    });
    statistic.save((err, statistic) => res.json(statistic));
  });
}

export function userSignup(req, res) {
  const { email, password } = req.body.data;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then((userRecord) => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
}

export function userLogin(req, res) {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then((user) => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ user: { error: 'invalid credentials' } });
    }
  });
}

export function userConfirmServer(req, res) {
  const { token } = req.params;
  User.findOneAndUpdate({ confirmationToken: token }, { confirmed: true }).then(
    res.redirect('http://localhost:8000/confirmation')
  );
}

export function userConfirm(req, res) {
  const { email } = req.body;

  User.findOne({ email }).then(user => (user
    ? res.json({ user: user.toAuthJSON() })
    : res.status(400).json({ user: null })));
}

export function resetPasswordRequest(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      sendResetPasswordEmail(user);
      user.save();
      res.json({ sended: true });
    } else {
      res
        .status(400)
        .json({ errors: { global: 'There is no user with such email' } });
    }
  });
}

export function resetPasswordRequestServer(req, res) {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(401).json({});
    } else {
      User.findOne({ resetToken: token }).then((user) => {
        if (user) {
          user.changeRequestPasswordState(true);
          user.save();
          res.redirect('http://localhost:8000/reset_password');
        } else {
          res.json({ status: 'not found' });
        }
      });
    }
  });
}

export function resetPassword(req, res) {
  const { password, email } = req.body.data;

  User.findOne({ email }).then((user) => {
    if (user && user.requestChangePassword === true) {
      user.setPassword(password);
      user.changeRequestPasswordState(false);
      user.save().then(() => res.json({ passwordChanged: true }));
    } else {
      res.status(404).json({ errors: { global: 'Invalid token' } });
    }
  });
}
