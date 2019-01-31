import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

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
    resetToken: { type: String, default: '' },
    requestChangePassword: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.CLIENT_HOST}/confirmation/${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  const resetToken = this.generateResetPasswordToken();
  return `${process.env.CLIENT_HOST}/reset_password/${resetToken}`;
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      confirmed: this.confirmed,
      userId: this.userId,
    },
    process.env.JWT_SECRET
  );
};
schema.methods.changeRequestPasswordState = function changeRequestPasswordState(
  e
) {
  this.requestChangePassword = e;
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

schema.plugin(uniqueValidator, { message: 'This email is already exist' });

export default mongoose.model('User', schema);
