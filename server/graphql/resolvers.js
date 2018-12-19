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
    async addToList(
      root,
      { exerciseName, weightFrom, weightTo },
      { currentUser, List }
    ) {
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
    async removeFromList(
      root,
      { exerciseDescriptionId },
      { currentUser, List }
    ) {
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
  },
};

export default resolvers;
