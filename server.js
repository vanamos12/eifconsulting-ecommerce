const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const shortId = require('shortid')
// Import our User schema
const User = require('./models/User.js');
const FrontEndUser = require('./models/FrontEndUser.js')
const BackEndUser = require('./models/BackEndUser.js')
const Plan = require('./models/Plan.js')
const {withAuthFrontEnd, withAuthBackEnd} = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(fileUpload({
  useTempFiles: true,
  safeFileNames: true,
  preserveExtension: true,
  tempFileDir: `${__dirname}/client/public/files/temp` 
}))

const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
    app.post('/api/modifyplan', function(req, res){
      let donnees = JSON.parse(req.body.data)
      const {_id, categorie, name, price, description, image} = donnees
      const {isStyleModerne, isStyleContemporain, isStyleTraditionnel} = donnees
      const {isNiveauPlainPied, isNiveauAEtages, isNiveauSousSol} = donnees
      const {isChambreTwo, isChambreThree, isChambreFourMore} = donnees
      const {isCoupCoeur, isPopular} = donnees
      Plan.findById(_id, function(err, plan){
        if (err || !plan){
          res.status(500).json({
            message:"erreur interne, veuillez recommencer.",
            image:image
          })
          console.log(err)
          console.log(plan)
        }else{
          plan.categorie = categorie
          plan.name = name
          plan.price = price 
          plan.image = image 
          plan.description = description
          plan.isStyleModerne = isStyleModerne
          plan.isStyleContemporain = isStyleContemporain
          plan.isStyleTraditionnel = isStyleTraditionnel
          plan.isNiveauPlainPied = isNiveauPlainPied
          plan.isNiveauAEtages = isNiveauAEtages
          plan.isNiveauSousSol = isNiveauSousSol
          plan.isChambreTwo = isChambreTwo
          plan.isChambreThree = isChambreThree
          plan.isChambreFourMore = isChambreFourMore
          plan.isCoupCoeur = isCoupCoeur
          plan.isPopular = isPopular

          if (req.files && Object.keys(req.files).length >0){
            let uploadedFile = req.files.file
            const id = shortId.generate(); 
            const newName = `${id}_${uploadedFile.name}`
            uploadedFile.mv(`${__dirname}/client/public/images/coupcoeurs/${newName}`, function(err){
              if (err){
                res.status(500).json({
                  message:'Erreur interne, veuillez reéssayer.',
                  image:image
                })
                console.log(err)
              }
              else{
                
                plan.image = `images/coupcoeurs/${newName}`
                plan.save(function(err){
                  if (err){
                    res.status(500).json({
                      message:'Erreur de sauvegarde du plan.',
                      image:image
                    })
                    console.log(err)
                  }else{
                    res.status(200).json({
                      message:'Tout s\'est bien passé.',
                      image:plan.image
                    })
                  }
                })
                
              }
            })
          }else{
            plan.save(function(err){
              if (err){
                res.status(500).json({
                  message:'Erreur de sauvegarde du plan.'
                })
                console.log(err)
              }else{
                res.status(200).json({
                  message:'Tout s\'est bien passé.'
                })
              }
            })
          }
          
        }
      })
      
      
      //console.log(`${id}_${uploadedFile.name}`)
      //console.log(req.body.data)
      
      
      
    })
    app.post('/api/addplan', function(req, res){
      let uploadedFile = req.files.file
      const id = shortId.generate(); 
      const newName = `${id}_${uploadedFile.name}`
      //console.log(`${id}_${uploadedFile.name}`)
      //console.log(req.body.data)
      let donnees = JSON.parse(req.body.data)
      const {categorie, name, price, description} = donnees
      const {isStyleModerne, isStyleContemporain, isStyleTraditionnel} = donnees
      const {isNiveauPlainPied, isNiveauAEtages, isNiveauSousSol} = donnees
      const {isChambreTwo, isChambreThree, isChambreFourMore} = donnees
      const {isCoupCoeur, isPopular} = donnees
      uploadedFile.mv(`${__dirname}/client/public/images/coupcoeurs/${newName}`, function(err){
        if (err){
          res.status(500).json({
            message:'Erreur interne, veuillez reéssayer.'
          })
          console.log(err)
        }
        else{
          
          const plan = new Plan({
            _id: new mongoose.Types.ObjectId(),
            categorie:categorie,
            name: name,
            price: price,
            image: `images/coupcoeurs/${newName}`,
            description:description,
            isStyleModerne: isStyleModerne,
            isStyleContemporain: isStyleContemporain,
            isStyleTraditionnel: isStyleTraditionnel,
            isNiveauPlainPied: isNiveauPlainPied,
            isNiveauAEtages: isNiveauAEtages,
            isNiveauSousSol: isNiveauSousSol,
            isChambreTwo: isChambreTwo,
            isChambreThree: isChambreThree,
            isChambreFourMore:isChambreFourMore,
            isCoupCoeur:isCoupCoeur,
            isPopular: isPopular
          })
          plan.save(function(err){
            if (err){
              res.status(500).json({
                message:'Erreur de sauvegarde du plan.'
              })
              console.log(err)
            }else{
              res.status(200).json({
                message:'Tout s\'est bien passé.'
              })
            }
          })
          
        }
      })
      
    })
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
    app.post('/api/signupBackEnd', function(req, res){
      const {email, password, name, surname, telephone} = req.body
      let signUpUser = new BackEndUser({
        _id: new mongoose.Types.ObjectId(),
        email:email,
        password:password,
        name:name,
        surname:surname,
        telephone:telephone
      })
      signUpUser.save(function (err){
        if (err) {
          if (err.code === 11000){
          res.status(500)
            .json({
              message: 'Cet email est déjà dans la base, choisissez un autre.'
            })
          }else{
            res.status(500)
            .json({
              message: 'Erreur interne, essayez encore!'
            })
          }
        }else{
          //console.log("user created")
          res.status(200).json({
            message:'Utilisateur crée avec succès'
          })
        }
      })
    })
    app.post('/api/signupFrontEnd', function(req, res){
      const {email, password, name, surname, telephone} = req.body
      let signUpUser = new FrontEndUser({
        _id: new mongoose.Types.ObjectId(),
        email:email,
        password:password,
        name:name,
        surname:surname,
        telephone:telephone,
        tabPlansBuyed:[]
      })
      signUpUser.save(function (err){
        if (err) {
          if (err.code === 11000){
          res.status(500)
            .json({
              message: 'Cet email est déjà dans la base, choisissez un autre.'
            })
          }else{
            res.status(500)
            .json({
              message: 'Erreur interne, essayez encore!'
            })
          }
        }else{
          //console.log("user created")
          res.status(200).json({
            message:'Utilisateur crée avec succès'
          })
        }
      })
    })
    app.post('/api/getBackEndUserAllPlans', withAuthBackEnd, function(req, res){
      
      Plan.find({}, function(err, plans){
        if (err){
          console.log(err)
          res.status(500).json({
            error:'Erreur interne, essayez encore'
          })
        }else{
          res.status(200).json({
            allPlans:plans
          })
        }
      })
    })
    app.post('/api/getFrontEndUserTabIdPlans', function(req, res){
      const {email} = req.body
      FrontEndUser.findOne({email}, function(err, user){
        if (err){
          console.log(err)
          res.status(500).json({
            error:'Erreur interne, essayez encore'
          })
        }else if(!user){
          res.status(401).json({
            error:'Vous n\'êtes pas authorisé'
          })
        }else{
          res.status(200).json({
            tabIdPlans:user.tabPlansBuyed
          })
        }
      })
    })
    app.post('/api/savePaymentsFrontEnd', function(req, res){
      const {email, tabIdPlans} = req.body
      //TODO save the email user tabIdPlans
      FrontEndUser.findOne({email}, function(err, user){
        if (err){
          console.log(err)
          res.status(500).json({
            error:'Erreur interne, essayez encore'
          })
        }else if(!user){
          res.status(401).json({
            error:'Vous n\'êtes pas authorisé'
          })
        }else{
          let tabId = [...user.tabPlansBuyed]
          let addTabPlansBuyed = tabIdPlans.map(item=>{
            if (tabId.findIndex(function(itemBuy){
                itemBuy._id === item._id
            }) < 0){
              return item
            }
          })
          user.tabPlansBuyed = [...tabId, ...addTabPlansBuyed]
          user.save(function(err){
            if (err){
              console.log(err)
              res.status(500).json({
                error:'Erreur interne, essayez encore'
              })
            }else{
              console.log('PaymentsSucessfully saved')
              res.status(200).json({
                error:'PaymentsSucessfully saved'
              })
            }
          })
        }
      })
    })
    app.post('/api/authenticateBackEnd', function(req, res) {
      const { email, password } = req.body;
      BackEndUser.findOne({ email }, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500)
            .json({
            error: 'Erreur interne, essayez encore'
          });
        } else if (!user) {
          res.status(401)
            .json({
              error: 'Email ou mot de passe incorrect'
            });
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(500)
                .json({
                  error: 'Erreur interne, essayez encore'
              });
            } else if (!same) {
              res.status(401)
                .json({
                  error: 'Email ou mot de passe incorrect'
              });
            } else {
              // Issue token
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
              });
              res.cookie('tokenBackEnd', token, { httpOnly: true })
                .status(200).json({
                  error:'Connexion correcte'
                });
            }
          });
        }
      });
    });
    app.post('/api/authenticateFrontEnd', function(req, res) {
      const { email, password } = req.body;
      FrontEndUser.findOne({ email }, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500)
            .json({
            error: 'Erreur interne, essayez encore'
          });
        } else if (!user) {
          res.status(401)
            .json({
              error: 'Email ou mot de passe incorrect'
            });
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(500)
                .json({
                  error: 'Erreur interne, essayez encore'
              });
            } else if (!same) {
              res.status(401)
                .json({
                  error: 'Email ou mot de passe incorrect'
              });
            } else {
              // Issue token
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
              });
              res.cookie('tokenFrontEnd', token, { httpOnly: true })
                .status(200).json({
                  error:'Connexion correcte'
                });
            }
          });
        }
      });
    });
    app.get('/checkTokenFrontEnd', withAuthFrontEnd, function(req, res) {
      FrontEndUser.findOne({email:req.email}, function(err, user){
        if (err || !user){
          console.log('Erreur de recherche d\'elements, l\'email n\'est pas enregistré')
        }else{
          res.status(200).json({
            email: req.email,
            message: 'Utilisateur authentifie',
            tabIdPlans:user.tabPlansBuyed
          });
        }
      })
      
    })

    app.get('/checkTokenBackEnd', withAuthBackEnd, function(req, res) {
      Plan.find({}, function(err, plans){
        if (err){
          res.status(500).json({
            email: '',
            message: 'Erreur de recherche dans la base de données',
            allPlans:[]
          })
        }else{
          res.status(200).json({
            email: req.email,
            message: 'Utilisateur authentifie',
            allPlans:plans
          });
        }
      })
      
    })

    app.get('/api/clearCookie', function(req,  res){
      res.clearCookie('tokenFrontEnd', {httpOnly:true})
      res.status(200).json({
        message:'cookie effacé'
      })
    })


  }
});

/*app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});*/
app.get('/api/secret', withAuthFrontEnd, function(req, res) {
  res.send('The password is potato');
});

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