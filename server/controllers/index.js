import Date from "../models/date";
import Exercise from "../models/exercise";
import Approach from "../models/approach";
import Statistic from "../models/statistic";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

export function getData(req, res) {
  Date.find({}).exec((err, date) => {
    Exercise.find({}, (err, exercises) => {
      Approach.find({}, (err, approaches) => {
        Statistic.find({}, (err, statistic) => {
          res.json({ date, exercises, approaches, statistic });
        });
      });
    });
  });
}

export function addExercise(req, res) {
  // если уже есть документ, с датой из req.body.date, то создать exercise и вернуть его в ответе
  // если документа нет, то создать его и  exercise, вернуть оба документа в ответе
  Date.count({ date: req.body.date }).then(count => {
    if (count === 0) {
      const date = new Date({ date: req.body.date });
      const exercise = new Exercise({
        dateId: date._id,
        exerciseName: "Подъем гантели в наклоне",
        date: req.body.date
      });

      date.save((err, newDate) => {
        exercise.save((err, newExercise) => res.json({ newDate, newExercise }));
      });
    } else {
      const exercise = new Exercise({
        dateId: req.body.dateId,
        exerciseName: "Подъем гантели в наклоне",
        date: req.body.date
      });
      exercise.save((err, newExercise) => res.json(newExercise));
    }
  });
}

export function dropDatabase(req, res) {
  Date.findOneAndRemove({ date: req.body.date }, (err, removedDate) => {
    Exercise.find({ date: req.body.date }, (err, removedExercises) => {
      Exercise.remove({ date: req.body.date }, err => {
        Approach.find({ date: req.body.date }, (err, removedApproaches) => {
          Approach.remove({ date: req.body.date }, err =>
            res.json({ removedDate, removedExercises, removedApproaches })
          );
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
          Approach.remove({ exerciseId: req.body.exerciseId }, err => {
            return res.json({ removedExercise, removedApproaches });
          });
        }
      );
    }
  );
}

export function changeName(req, res) {
  Exercise.findOne({ _id: req.body.exerciseId }, (err, exercise) => {
    exercise.set({
      exerciseName: req.body.exerciseName
    });
    exercise.save((err, updatedExercise) => {
      Approach.find({ exerciseId: req.body.exerciseId }, (err, approaches) => {
        approaches.map(approach => {
          approach.set({
            exerciseName: req.body.exerciseName
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
            exerciseName: req.body.exerciseName
          });
          approach.save((err, newApproach) =>
            res.json({ newApproach, oldApproach })
          );
        });
    } else {
      const approach = new Approach({
        dateId: req.body.dateId,
        date: req.body.date,
        exerciseId: req.body.exerciseId,
        exerciseName: req.body.exerciseName
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
      weight: req.body.weight
    });

    approach.save((err, changedApproach) => res.json(changedApproach));
  });
}

export function workoutStart(req, res) {
  Statistic.findOne({ date: req.body.date }, (err, date) => {
    if (date) {
      date.set({
        workoutStart: req.body.workoutStart
      });
      date.save((err, statistic) => res.json(statistic));
    } else {
      const statistic = new Statistic({
        date: req.body.date,
        workoutStart: req.body.workoutStart
      });
      statistic.save((err, statistic) => res.json(statistic));
    }
  });
}

export function workoutFinish(req, res) {
  Statistic.findOne({ date: req.body.date }, (err, statistic) => {
    statistic.set({
      workoutFinish: req.body.workoutFinish,
      workoutTime: Math.ceil(
        (req.body.workoutFinish - statistic.workoutStart) / 1000
      )
    });
    statistic.save((err, statistic) => res.json(statistic));
  });
}

export function userSignup(req, res) {
  console.log(req.body);
  const { email, password } = req.body.data;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      /* sendConfirmationEmail(userRecord); */
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
}

export function userLogin(req, res) {
  const { email, token } = req.body.user;
  User.findOne({ email }).then(user => {
    if (user && user.isValidPassword(token)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
}
