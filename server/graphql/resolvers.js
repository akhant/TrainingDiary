import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail, sendConfirmationEmail } from '../mailer';

const resolvers = {
  Query: {
    async getCurrentUser(root, args, { currentUser, User }) {
      if (!currentUser) return null;
      const user = await User.findOne({ email: currentUser.email });
      return user;
    },
    async getList(root, args, { currentUser, List }) {
      const list = await List.find({ userId: currentUser.userId });

      return { list };
    },
    async getDayData(root, { date }, {
      currentUser, Exercise, Approach, List, Statistic,
    }) {
      const exercises = Exercise.find({ userId: currentUser.userId, date });
      const approaches = Approach.find({ userId: currentUser.userId, date }).sort({ _id: 1 });
      const list = List.find({ userId: currentUser.userId });
      const statistic = Statistic.findOne({ userId: currentUser.userId, date });
      await Promise.all([exercises, approaches, list, statistic]);

      return {
        date,
        exercises,
        approaches,
        list,
        statistic,
      };
    },

    async getExerciseApproaches(root, { exerciseName }, { currentUser, Approach }) {
      const approaches = Approach.find({ userId: currentUser.userId, exerciseName }).sort({ _id: 1 });

      return {
        approaches,
      };
    },

    async confirmation(root, { token }, { User }) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return new Error('Invalid data');
      }
      user.confirmed = true;
      user.save();
      return { ok: true };
    },
  },

  Mutation: {
    async signupUser(root, { username, email, password }, { User }) {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('User with such email already exists');
      }
      const newUser = new User({
        username,
        email,
      });
      newUser.setPassword(password);
      newUser.setConfirmationToken();
      newUser.userId = newUser._id.toString();
      await newUser.save();
      sendConfirmationEmail(newUser);
      return { token: newUser.confirmationToken };
    },

    async signinUser(root, { email, password }, { User }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      if (!user.isValidPassword(password)) {
        throw new Error('Invalid password');
      }
      user.setConfirmationToken();
      return { token: user.confirmationToken };
    },

    async addToList(root, { exerciseName, weightFrom, weightTo }, { currentUser, List }) {
      const exercise = new List({
        exerciseName,
        userId: currentUser.userId,
        weightFrom,
        weightTo,
      });

      exercise.exerciseDescriptionId = exercise._id.toString();
      await exercise.save();

      return exercise;
    },

    async removeFromList(root, { exerciseDescriptionId }, { currentUser, List }) {
      const removed = await List.findOneAndRemove({
        userId: currentUser.userId,
        exerciseDescriptionId,
      });

      return removed;
    },

    async changeList(
      root,
      {
        exerciseDescriptionId, exerciseName, weightFrom, weightTo,
      },
      { currentUser, Approach, List }
    ) {
      const updated = await List.findOneAndUpdate(
        {
          userId: currentUser.userId,
          exerciseDescriptionId,
        },
        { exerciseName, weightFrom, weightTo }
      );
      await Approach.updateMany(
        { userId: currentUser.userId, exerciseName },
        {
          exerciseName,
          weightFrom,
          weightTo,
        }
      );

      return updated;
    },

    async addExercise(root, { date }, { currentUser, Exercise }) {
      const exercise = new Exercise({
        userId: currentUser.userId,
        date,
      });

      exercise.exerciseId = exercise._id.toString();
      await exercise.save();
      return exercise;
    },

    async removeExercise(root, { exerciseId }, { currentUser, Exercise, Approach }) {
      const removed = await Exercise.findOneAndRemove({
        userId: currentUser.userId,
        exerciseId,
      });

      await Approach.deleteMany({
        userId: currentUser.userId,
        exerciseId,
      });

      return removed;
    },

    async changeSelectExerciseName(root, { exerciseId, exerciseName }, {
      currentUser, Exercise, Approach, List,
    }) {
      const updated = await Exercise.findOneAndUpdate(
        {
          userId: currentUser.userId,
          exerciseId,
        },
        { exerciseName }
      );

      // need to find weight to
      const exerciseDescription = await List.findOne({
        userId: currentUser.userId,
        exerciseName,
      });
      await Approach.updateMany(
        { userId: currentUser.userId, exerciseId },
        { weight: exerciseDescription.weightTo, exerciseName }
      );

      return updated;
    },

    async addApproach(root, { exerciseId, startApproachTime }, {
      currentUser, Approach, Exercise, List, Statistic,
    }) {
      // need to find exercise description by exerciseId
      const exercise = await Exercise.findOne({ userId: currentUser.userId, exerciseId });
      const date = new Date().toDateString();
      // need to find weight to
      const exerciseDescription = await List.findOne({
        userId: currentUser.userId,
        exerciseName: exercise.exerciseName,
      });

      const approach = new Approach({
        userId: currentUser.userId,
        exerciseId,
        exerciseName: exercise.exerciseName,
        startApproachTime,
        approachTime: 0,
        date,
        value: 0,
        weight: exerciseDescription.weightTo,
        restTime: 0,
      });

      const allApproachesForThisDay = await Approach.find({
        userId: currentUser.userId,
        date,
      }).sort({ _id: 1 });

      if (allApproachesForThisDay.length) {
        const last = allApproachesForThisDay[allApproachesForThisDay.length - 1];

        approach.weight = last.weight;
        approach.restTime = startApproachTime - last.finishApproachTime;
      } else if (allApproachesForThisDay.length === 0) {
        const todayStat = await Statistic.findOne({ userId: currentUser.userId, date });
        approach.restTime = startApproachTime - todayStat.workoutStart;
      }

      approach.approachId = approach._id.toString();
      await approach.save();
      return approach;
    },

    async removeApproach(root, { approachId }, { currentUser, Approach }) {
      const removed = await Approach.findOneAndRemove({
        userId: currentUser.userId,
        approachId,
      });
      return removed;
    },

    async changeApproachValue(root, { approachId, value, finishApproachTime }, { currentUser, Approach }) {
      const approach = await Approach.findOne({
        userId: currentUser.userId,
        approachId,
      });
      approach.value = value;
      approach.finishApproachTime = finishApproachTime;
      approach.approachTime = finishApproachTime - approach.startApproachTime;
      await approach.save();
      return approach;
    },

    async changeApproachWeight(root, { approachId, weight }, { currentUser, Approach }) {
      const approach = await Approach.findOneAndUpdate(
        {
          userId: currentUser.userId,
          approachId,
        },
        { weight }
      );

      return approach;
    },

    async workoutStart(root, { workoutStart }, { currentUser, Statistic }) {
      const existing = await Statistic.findOne({
        userId: currentUser.userId,
        date: new Date().toDateString(),
      });
      if (existing) {
        existing.workoutStart = workoutStart;
        existing.save();
        return existing;
      }
      const newStat = new Statistic({
        userId: currentUser.userId,
        date: new Date().toDateString(),
        workoutStart,
      });
      newStat.save();
      return newStat;
    },

    async workoutFinish(root, { workoutFinish }, { currentUser, Statistic }) {
      const stat = await Statistic.findOne({
        userId: currentUser.userId,
        date: new Date().toDateString(),
      });
      stat.workoutFinish = workoutFinish;
      stat.workoutTime = stat.workoutFinish - stat.workoutStart;

      await stat.save();

      return stat;
    },

    async sendForgotPassword(root, { email }, { User }) {
      const user = await User.findOne({ email });
      if (user) {
        sendResetPasswordEmail(user);
      } else {
        throw new Error('Invalid email');
      }

      return { ok: 'email was sended' };
    },

    async resetPassword(root, { password, token }, { User }) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return new Error('Invalid data');
      }
      user.setPassword(password);
      user.save();
      return { ok: true };
    },
  },
};

export default resolvers;
