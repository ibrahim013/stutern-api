import pkg from 'mongoose';

import validator from 'validator';

const { Schema, model } = pkg;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String
    },
  },
  { timestamps: true }
);

export const User = model('user', userSchema);
