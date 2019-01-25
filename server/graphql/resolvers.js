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
      const statistic = Statistic.find({ userId: currentUser.userId, date });
      await Promise.all([exercises, approaches, list, statistic]);

      return {
        date,
        exercises,
        approaches,
        list,
        statistic,
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
    async changeList(
      root,
      {
        exerciseDescriptionId, exerciseName, weightFrom, weightTo,
      },
      { currentUser, List }
    ) {
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

    async changeSelectExerciseName(root, { exerciseId, exerciseName }, { currentUser, Exercise }) {
      const updated = await Exercise.findOneAndUpdate(
        {
          userId: currentUser.userId,
          exerciseId,
        },
        { exerciseName }
      );

      return updated;
    },

    async addApproach(
      root,
      { exerciseId, startApproachTime },
      {
        currentUser, Approach, Exercise, List,
      }
    ) {
      const exercise = await Exercise.findOne({ userId: currentUser.userId, exerciseId });

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
        // TODO: add time
      });
      const allApproachesForThisExercise = await Approach.find({
        userId: currentUser.userId,
        exerciseId,
      });
      if (allApproachesForThisExercise.length) {
        const last = allApproachesForThisExercise[allApproachesForThisExercise.length - 1];

        approach.weight = last.weight;
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

    async changeApproachValue(
      root,
      { approachId, value, finishApproachTime },
      { currentUser, Approach }
    ) {
      const updated = await Approach.findOneAndUpdate(
        {
          userId: currentUser.userId,
          approachId,
        },
        { value, finishApproachTime }
      );

      return updated;
    },

    async changeApproachWeight(root, { approachId, weight }, { currentUser, Approach }) {
      const updated = await Approach.findOneAndUpdate(
        {
          userId: currentUser.userId,
          approachId,
        },
        { weight }
      );

      return updated;
    },
    async workoutStart(root, { workoutStart }, { currentUser, Statistic }) {
      const stat = new Statistic({
        userId: currentUser.userId,
        date: new Date().toDateString(),
        workoutStart,
      });

      await stat.save();

      return stat;
    },
    async workoutFinish(root, { workoutFinish }, { currentUser, Statistic }) {      
      const stat = await Statistic.findOne(
        {
          userId: currentUser.userId,
          date: new Date().toDateString(),
        }
      );
      stat.workoutFinish = workoutFinish;
      stat.workoutTime = +stat.workoutFinish - +stat.workoutStart;

      await stat.save();

      return stat;
    },
  },
};

export default resolvers;
