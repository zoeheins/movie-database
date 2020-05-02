import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/user';

dotenv.config(); // import env
const secret = process.env.SECRET;

const register = (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    const user = new User({ email, password: hashedPassword });
    console.log(user)
    user.save(function (err) {
      if (err) {
        res.status(500).send('error registering');
      } else {
        res.status(200).send('welcome!');
      }
    });
  })
};

const authenticate = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      res.status(500).json({ error: 'Internal error' });
    } else if (!user) {
      res.status(401).json({ error: 'Incorrect email' });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500).send('Internal error')
        } else if (!same) {
          res.status(401).send('Incorrect email or password')
        } else {
          // issue token
          console.log('issuing token...');
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h',
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        };
      })
    }
  });
};

const logout = (req, res) => {
  res.clearCookie('token').sendStatus(200);
};

export { authenticate, logout, register };
