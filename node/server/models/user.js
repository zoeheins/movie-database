import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.isCorrectPassword = function (password) {
  return password === this.password;
};

const User = mongoose.model('User', UserSchema);

export default User;
