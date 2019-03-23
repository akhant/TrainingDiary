import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      /* unique: true, */
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    userId: String,
    passwordHash: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: '' },
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function () {
  this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function () {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function () {
  const resetToken = this.generateResetPasswordToken();
  return `${process.env.HOST}/reset_password/${resetToken}`;
};

schema.methods.generateJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      confirmed: this.confirmed,
      userId: this.userId,
    },
    process.env.JWT_SECRET
  );
};

schema.methods.generateResetPasswordToken = function () {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

schema.methods.toAuthJSON = function () {
  return {
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

export default mongoose.model('User', schema);
