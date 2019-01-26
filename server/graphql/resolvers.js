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

    async changeList(root, {
      exerciseDescriptionId, exerciseName, weightFrom, weightTo,
    }, { currentUser, List }) {
      const updated = await List.findOneAndUpdate(
        {
          userId: currentUser.userId,
          exerciseDescriptionId,
        },
        { exerciseName, weightFrom, weightTo }
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
      currentUser, Approach, Exercise, List,
    }) {
      // need to find exercise description by exerciseId
      const exercise = await Exercise.findOne({ userId: currentUser.userId, exerciseId });

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
        date: new Date().toDateString(),
        value: 0,
        weight: exerciseDescription.weightTo,
        restTime: 0,
      });

      const allApproachesForThisExercise = await Approach.find({
        userId: currentUser.userId,
        exerciseId,
      }).sort({ _id: 1 });

      if (allApproachesForThisExercise.length) {
        const last = allApproachesForThisExercise[allApproachesForThisExercise.length - 1];

        approach.weight = last.weight;
        approach.restTime = startApproachTime - last.finishApproachTime;
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
  },
};

export default resolvers;
