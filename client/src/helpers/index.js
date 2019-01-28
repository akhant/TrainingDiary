import React from 'react';
import isEmail from 'validator/lib/isEmail';

// time - in seconds
export const elapsedTime = (time) => {
  if (time === 0) return <div className="add-time">00:00:00</div>;
  const S = `${time % 60} sec `;
  const H = time < 3600 ? '' : `${~~(time / 3600)} h `;
  const M = time < 60 ? '' : `${~~((time % 3600) / 60)} min `;

  return (
    <div className="add-time">
      {H} {M} {S}
    </div>
  );
};

export const validateForm = (data) => {
  const errors = {};
  const {
    email, password, confirmationPassword, username, exerciseName, weightTo, weightFrom,
  } = data;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      switch (key) {
        case 'email':
          if (!isEmail(email)) errors[key] = 'Invalid email';
          if (email.length > 30) errors[key] = `${key} is too long`;
        case 'password':
          if (password.length < 8) errors[key] = `${key} has to be at least 8 characters`;
          if (password.length > 30) errors[key] = `${key} is too long`;
        case 'confirmationPassword':
          if (confirmationPassword.length < 8) errors[key] = `${key} has to be at least 8 characters`;
          if (confirmationPassword.length > 30) errors[key] = `${key} is too long`;
          if (confirmationPassword !== password) errors[key] = `Passwords must match`
        case 'username':
          if (username.length < 2) errors[key] = `${key} is too short`;
          if (username.length > 20) errors[key] = `${key} is too long`;
        case 'exerciseName':
          if (exerciseName.length < 2) errors[key] = `${key} is too short`;
          if (exerciseName.length > 40) errors[key] = `${key} is too long`;
        case 'weightTo':
          if (isNaN(+weightTo)) errors.weightTo = 'Invalid value';
          if (+weightTo <= +weightFrom) errors.weightTo = 'value of weight "to" has to be bigger than "from"';
        case 'weightFrom':
          if (isNaN(+weightFrom)) errors.weightFrom = 'Invalid value';
      }
    }
  }
  return { errors, noErrors: Object.keys(errors).length === 0 };
};
