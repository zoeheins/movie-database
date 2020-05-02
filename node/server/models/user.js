import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
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
