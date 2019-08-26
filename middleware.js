// middleware.js
const jwt = require('jsonwebtoken');
const {secret, Role} = require('./config.js');

const authorize = function (roles=[]){
  if (typeof roles === "string"){
    roles = [roles]
  }

  return  function(req, res, next) {
    const token =
      req.body.tokenFrontEnd ||
      req.query.tokenFrontEnd ||
      req.headers['x-access-token'] ||
      req.cookies.tokenFrontEnd;
    if (!token) {
      res.status(401).json({
        status:401,
        message:'Unauthorized: No token provided'
      });
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).json({
            status:401,
            message:'Unauthorized: Invalid token'
          });
        } else {
          req.email = decoded.email;
          req.role = decoded.role
          if (!roles.includes(req.role)){
            res.status(401).json({
              status:401,
              message:'Unauthorized: Invalid role'
            });
          }else{
            next();
          }
        }
      });
    }
  } 
}
const withAuthBackEnd = function(req, res, next) {
  const token =
    req.body.tokenBackEnd ||
    req.query.tokenBackEnd ||
    req.headers['x-access-token'] ||
    req.cookies.tokenBackEnd;
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
        req.role = decoded.role;
        next();
      }
    });
  }
}

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
        req.role = decoded.role
        next();
      }
    });
  }
}
module.exports = {withAuthFrontEnd, withAuthBackEnd, authorize};