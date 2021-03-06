import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.SECRET;

const withAuth = function(req, res, next) {
  const token = 
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token ) {
    console.log('no cookies')
    res.status(401).send('No token')
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Invalid token')
      } else {
        req.email = decoded.email;
        next()
      }
    })
  }
}

export default withAuth;
