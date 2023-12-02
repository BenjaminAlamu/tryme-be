import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      trim: true
    }
  },
  { timestamps: true, versionKey: false }
);

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

export const User = mongoose.model('User', userSchema);
