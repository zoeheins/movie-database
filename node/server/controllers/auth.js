import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

dotenv.config(); // import env
const secret = process.env.SECRET;

const register = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      res.status(500).send('error registering');
    } else {
      console.log(user.email);
      res.status(200).send('welcome!');
    }
  });
};

const authenticate = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      res.status(500).json({ error: 'Internal error' });
    } else if (!user) {
      res.status(401).json({ error: 'Incorrect email' });
    } else {
      if (user.isCorrectPassword(password)) {
        // issue token
        console.log('issuing token...');
        const payload = { email };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h',
        });
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
      } else {
        res.send(401).json({ error: 'Incorrect login' });
      }
    }
  });
};

export { authenticate, register };
