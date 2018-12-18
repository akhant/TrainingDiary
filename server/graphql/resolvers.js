const resolvers = {
  Query: {
    async getCurrentUser(root, args, { currentUser, User }) {
      if (!currentUser) return null;
      const user = await User.findOne({ email: currentUser.email });
      return user;
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
      {
        userId, exerciseName, weightFrom, weightTo,
      },
      { List }
    ) {
      const exercise = new List({
        exerciseName,
        userId,
        weightFrom,
        weightTo,
      });
      
      exercise.exerciseDescriptionId = exercise._id.toString();
      await exercise.save();
      return exercise;
    },
  },
};

export default resolvers;
