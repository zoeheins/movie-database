import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import foreignKeyHelper from './foreignKeyHelper';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    validate: {
      validator: function(v) {
        return foreignKeyHelper(mongoose.model('Movie'), v);
      },
      message: "already exists"
    }
  }],
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const User = mongoose.model('User', UserSchema);

export default User;
