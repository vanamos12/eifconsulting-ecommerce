// middleware.js
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const withAuthFrontEnd = function(req, res, next) {
  const token =
    req.body.tokenFrontEnd ||
    req.query.tokenFrontEnd ||
    req.headers['x-access-token'] ||
    req.cookies.tokenFrontEnd;
  if (!token) {
    res.status(401).json({
      message:'Unauthorized: No token provided'
    });
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({
          message:'Unauthorized: Invalid token'
        });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = {withAuthFrontEnd};