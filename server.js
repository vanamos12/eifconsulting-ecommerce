const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// Import our User schema
const User = require('./models/User.js');
const FrontEndUser = require('./models/FrontEndUser.js')
const BackEndUser = require('./models/BackEndUser.js')
const Plan = require('./models/Plan.js')
const withAuth = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
    app.get('/api/home', function(req, res){
      Plan.find({isCoupCoeur:true})
        .exec(function(err, plansCoupCoeur){
            if (err){
              console.log(err)
              throw err
            }else{
              res.status(200).json({
                plansCoupCoeur: plansCoupCoeur
              })
            }
        })
    })
    // POST route to register a user
    app.post('/api/register', function(req, res) {
      const { email, password } = req.body;
      const user = new User({ email, password });
      user.save(function(err) {
        if (err) {
          res.status(500)
            .send("Error registering new user please try again.");
        } else {
          res.status(200).send("Welcome to the club!");
        }
      });
    });
    app.post('/api/signup', function(req, res){
      const {email, password} = req.body
      let signUpUser = new User({
        email:email,
        password:password
      })
      signUpUser.save(function (err){
        if (err) {
          console.log(err)
          res.status(500)
            .json({
              error: 'Internal error please try again'
            })
        }else{
          console.log("user created")
          res.status(200).json({
            message:'User created'
          })
        }
      })
    })
    app.post('/api/authenticate', function(req, res) {
      const { email, password } = req.body;
      User.findOne({ email }, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!user) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(500)
                .json({
                  error: 'Internal error please try again'
              });
            } else if (!same) {
              res.status(401)
                .json({
                  error: 'Incorrect email or password'
              });
            } else {
              // Issue token
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
              });
              res.cookie('token', token, { httpOnly: true })
                .sendStatus(200);
            }
          });
        }
      });
    });
    
  }
});

/*app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});*/
app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
})
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));