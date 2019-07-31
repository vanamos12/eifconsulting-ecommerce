const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const shortId = require('shortid')
const nodemailer = require("nodemailer");
const crypto = require('crypto')

// Import our User schema
const User = require('./models/User.js');
const FrontEndUser = require('./models/FrontEndUser.js')
const BackEndUser = require('./models/BackEndUser.js')
const PrecommandPlan = require('./models/PrecommandPlan.js')
const Plan = require('./models/Plan.js')
const Newletter = require('./models/Newletter.js')
const {withAuthFrontEnd, withAuthBackEnd, authorize} = require('./middleware');
const {secret, Role} = require('./config.js');

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

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'markupconsulting2017@gmail.com', // generated ethereal user
    pass: 'loicsadjomarkup' // generated ethereal password
  }
});

let mongo_uri = '';
let save_path = '';
if (process.env.NODE_ENV === 'production') {
  mongo_uri = 'mongodb+srv://pokatchoneng:rolande12@cluster0-dq3vz.mongodb.net/test?retryWrites=true&w=majority';
  save_path = '/client/build';
}else{
  // We are in developpment mode
  mongo_uri = 'mongodb://localhost/react-auth';
  save_path = '/client/public';
}
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
    app.post('/api/sendmail', async function(req, res){
      const {message_html, message_text, mail} = req.body
      
      transporter.sendMail({
          from: 'markupconsulting2017@gmail.com',
          to: 'eifconsultingandservices@gmail.com',
          cc:mail,
          subject: 'Message depuis le site e-commerce eif-consulting',
          text: message_text,
          html: message_html
      }, (err, info) => {
        if (err){
          console.log("erreur", err)
          res.status(500).json({
            message:"Erreur interne."
          })
        }else{
          console.log(info.envelope);
          console.log(info.messageId);
          res.status(200).json({
              message:"message send." 
          })
        }
      });
    })
    app.post('/api/newletter', async function(req, res){
      const {email} = req.body
      const recordnewletter = new Newletter({
        _id:new mongoose.Types.ObjectId(),
        email:email
      })
      recordnewletter.save(function(err){
        if (err){
          if (err.code === 11000){
            res.status(500)
              .json({
                message: 'Cet email est déjà dans la base, merci.'
              })
          }else{
              res.status(500)
              .json({
                message: 'Erreur interne, essayez encore!'
              })
          }
        }else{
          res.status(200).json({
            message:'Votre email a été pris en compte.'
          })
        }
      })

    })
    app.get('/notifydohone', function(req, res){
      const {rI, rMt, rDvs, idReqDoh, rH, mode, motif } = req.query
      PrecommandPlan.findOne({command:rI}, function(err, cart){
        if (err && !cart){
          console.log("On n'a pas trouvé la commande.")
          res.status(500).json({
            message:"Erreur d'identification de la commande"
          })
        }else{
          //Verify the amount, verify the rH
          if (rMt==cart.total && rDvs=="XAF" && rH=="EL156T672281"){
            // we save the payments
            console.log("Tout est correct");
            let tabIdPlans = cart.plans;
            let email = cart.email;
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
                let addTabPlansBuyed = tabIdPlans.filter(item=>{
                  return !tabId.some(itemBuy=>itemBuy._id === item._id)
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
          }
        }
      })
    })
    app.post('/api/mobilePayment', function(req, res){
      const {telephone, cart, email, total} = req.body
      const command = telephone + shortId.generate()
      const precommandplan = new PrecommandPlan({
        _id: new mongoose.Types.ObjectId(),
        command:command,
        telephone:telephone,
        email:email,
        total:total,
        plans:cart
      })
      precommandplan.save(function(err){
        if (err){
          res.status(500).json({
            message:'Erreur d\'enregistrement dans la base.'
          })
        }else{
          res.status(200).json({
            message:'Erreur d\'enregistrement dans la base.',
            command:command
          })
        }
      })

    })
    app.get('/api/getFrontEndUserAllPlans', function(req, res){
      Plan.find({}, function(err, plans){
        if (err){
          res.status(500).json({
            message:'Erreur interne',
            allPlans:[]
          })
        }else{
          res.status(200).json({
            message: 'Succès',
            allPlans:plans
          })
        }
      })
    })
    app.post('/api/search', function(req, res){
      const {categorie} = req.body
      const {isAll, isStyleModerne, isStyleContemporain, isStyleTraditionnel} = req.body
      const {isNiveauPlainPied, isNiveauAEtages, isNiveauSousSol} = req.body
      const {isChambreTwo, isChambreThree, isChambreFourMore} = req.body
      if (isAll){
        Plan.find({}, function(err, plans){
          if (err){
            res.status(500).json({
              results:[]
            })
          }else{
            res.status(200).json({
              results:plans
            })
          }
        })
      }else if(categorie === ''){
        Plan.find({
          isStyleModerne:isStyleModerne, 
          isStyleContemporain:isStyleContemporain, 
          isStyleTraditionnel:isStyleTraditionnel,
          isNiveauPlainPied:isNiveauPlainPied, 
          isNiveauAEtages:isNiveauAEtages, 
          isNiveauSousSol:isNiveauSousSol,
          isChambreTwo:isChambreTwo, 
          isChambreThree:isChambreThree, 
          isChambreFourMore:isChambreFourMore
        }, function(err, plans){
          if (err){
            console.log(err)
            res.status(500).json({
              results:[]
            })
          }else{
            res.status(200).json({
              results:plans
            })
          }
        })
      }else{
        Plan.find({
          categorie:categorie,
          isStyleModerne:isStyleModerne, 
          isStyleContemporain:isStyleContemporain, 
          isStyleTraditionnel:isStyleTraditionnel,
          isNiveauPlainPied:isNiveauPlainPied, 
          isNiveauAEtages:isNiveauAEtages, 
          isNiveauSousSol:isNiveauSousSol,
          isChambreTwo:isChambreTwo, 
          isChambreThree:isChambreThree, 
          isChambreFourMore:isChambreFourMore
        }, function(err, plans){
          if (err){
            console.log(err)
            res.status(500).json({
              results:[]
            })
          }else{
            res.status(200).json({
              results:plans
            })
          }
        })
      }
      
    })
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
            uploadedFile.mv(`${__dirname}${save_path}/images/coupcoeurs/${newName}`, function(err){
              if (err){
                res.status(500).json({
                  message:'Erreur interne, veuillez reéssayer.',
                  image:image
                })
              }
              else{
                
                plan.image = `images/coupcoeurs/${newName}`
                plan.save(function(err){
                  if (err){
                    res.status(500).json({
                      message:'Erreur de sauvegarde du plan.',
                      image:image
                    })
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
    })
    app.post('/api/addplan', function(req, res){
      let uploadedFile = req.files.file
      const id = shortId.generate(); 
      const newName = `${id}_${uploadedFile.name}`
      let donnees = JSON.parse(req.body.data)
      const {categorie, name, price, description} = donnees
      const {isStyleModerne, isStyleContemporain, isStyleTraditionnel} = donnees
      const {isNiveauPlainPied, isNiveauAEtages, isNiveauSousSol} = donnees
      const {isChambreTwo, isChambreThree, isChambreFourMore} = donnees
      const {isCoupCoeur, isPopular} = donnees
      uploadedFile.mv(`${__dirname}${save_path}/images/coupcoeurs/${newName}`, function(err){
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
                message:'Erreur de sauvegarde du plan.',
                plan:plan
              })
              console.log(err)
            }else{
              res.status(200).json({
                message:'Tout s\'est bien passé.',
                plan:plan
              })
            }
          })
          
        }
      })
      
    })
    app.get('/api/homePopular', function(req, res){
      Plan.find({isPopular:true})
        .exec(function(err, plansPopular){
            if (err){
              console.log(err)
              res.status(500).json({
                plansPopular: []
              })
            }else{
              res.status(200).json({
                plansPopular: plansPopular
              })
            }
        })
    })
    app.get('/api/home', function(req, res){
      Plan.find({isCoupCoeur:true})
        .exec(function(err, plansCoupCoeur){
            if (err){
              console.log(err)
              res.status(500).json({
                plansCoupCoeur: []
              })
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
    app.post('/api/modify-password-node', function(req, res){
      const {passwordResetToken, password} = req.body
      FrontEndUser.findOne({
        passwordResetToken:passwordResetToken
      }, (err, user)=>{
        if (err || !user){
          res.status(200).json({
            message:'Votre mot de passe n\'a pas été modifié.'
          })
        }else{
          user.password = password
          user.passwordResetToken = ''
          user.save(err=>{
            if (err){
              res.status(200).json({
                message:'Votre mot de passe n\'a pas été modifié.'
              })
            }else{
              res.status(200).json({
                message:'Votre mot de passe a bien été modifié.'
              })
            }
          })
          
        }
      });
      
    })
    app.post('/api/send-password-modification-token', function(req, res){
      const {email} = req.body
      const randomToken = crypto.randomBytes(20)
      const passwordResetToken = crypto.createHash('sha1').update(randomToken+email).digest('hex')
      FrontEndUser.findOneAndUpdate({
        email:email
      }, {
        passwordResetToken:passwordResetToken
      }, {
        new:true
      }).exec((err, user)=>{
        if (err || !user){
          console.log("Email is not in the database")
          res.status(200).json({
            status:'emailnonenregistre'
          })
        }else{
          console.log('We send the password modification token.')
          let uri = `${req.protocol}` + '://' + `${req.hostname}` + '/api/modify-password/' + `${passwordResetToken}`
          let message_text = `Bonjour ${user.surname}\n`;
              message_text += "Vous avez demandé la modification de votre mot de passe.\n"
              message_text += `Pour le faire, veuillez copier et coller le lien suivant dans la barre d'adresse du navigateur : \n`
              message_text += `${uri}`
              message_text += '\nBonne journée.\n'
              message_text += 'Le service client EIF-Consulting'

              let message_html = `Bonjour ${user.surname}<br/>`;
              message_html += "Bienvenue sur le site d'e-commerce EIF-Consulting<br/>"
              message_html += "Vous avez demandé la modification de votre mot de passe.<br/>"
              message_html += "Veuillez cliquer sur le lien suivant pour le faire : "
              message_html += `<a href ="${uri}" target="_blank">Modifier mon mot de passe</a><br/>`
              message_html += `Ou copier et coller le lien suivant dans la barre d'adresse du navigateur : <br/>`
              message_html += `${uri}`
              message_html += '<br/>Bonne journée.<br/>'
              message_html += 'Le service client EIF-Consulting'

              transporter.sendMail({
                from: 'markupconsulting2017@gmail.com',
                to: email,
                subject: 'Modification de votre mot de passe sur le site e-commerce eif-consulting',
                text: message_text,
                html: message_html
            }, (err, info) => {
              if (err){
                console.log("erreur", err)
                res.status(200).json({
                  status:"erreurenvoiemail"
                })
              }else{
                console.log(info.envelope);
                console.log(info.messageId);
                res.status(200).json({
                   status:"okay" 
                })
              }
            });
        }
      })
    })
    app.post('/api/verify-email-node', function(req, res){
      const {emailVerificationToken} = req.body
      console.log(emailVerificationToken);
      FrontEndUser.findOneAndUpdate({
        emailVerificationToken:emailVerificationToken
      },{
        emailVerificationToken:'',
        isEmailVerified:true
      }, {
        new:true
      }).exec((err, user)=>{
        if (err || !user){
          console.log('We did not find the email verification token ')
          res.status(200).json({
            utilisateur:''
          })
        }else{
          res.status(200).json({
            utilisateur:user.role
          })
        }
      })
    })
    app.post('/api/signupFrontEnd', function(req, res){
      const {email, password, name, surname, telephone, role} = req.body
      let signUpUser = new FrontEndUser({
        _id: new mongoose.Types.ObjectId(),
        email:email,
        password:password,
        name:name,
        surname:surname,
        telephone:telephone,
        role:role,
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
          // Send the verification mail
          const randomToken = crypto.randomBytes(20)
          const emailVerifyToken = crypto.createHash('sha1').update(randomToken+email).digest('hex')
          FrontEndUser.findOneAndUpdate({
            email:email
          }, {
            emailVerificationToken:emailVerifyToken
          }, {
            new:true
          }).exec((err, details)=>{
            if (err || !details){
              res.status(500).json({
                message:'Erreur d\'enregistrement de l\'utilisateur'
              })
            }else{
              let uri = `${req.protocol}` + '://' + `${req.hostname}` + '/api/verify-email/' + `${emailVerifyToken}`
              let message_text = `Bonjour ${surname}\n`;
              message_text += "Bienvenue sur le site d'e-commerce EIF-Consulting\n"
              message_text += `Pour activer votre compte, veuillez copier et coller le lien suivant dans la barre d'adresse du navigateur : \n`
              message_text += `${uri}`
              message_text += '\nBonne journée.\n'
              message_text += 'Le service client EIF-Consulting'

              let message_html = `Bonjour ${surname}<br/>`;
              message_html += "Bienvenue sur le site d'e-commerce EIF-Consulting<br/>"
              message_html += "Veuillez cliquer sur le lien suivant pour activer votre compte : "
              message_html += `<a href ="${uri}" target="_blank">Vérifier votre compte</a><br/>`
              message_html += `Ou copier et coller le lien suivant dans la barre d'adresse du navigateur : <br/>`
              message_html += `${uri}`
              message_html += '<br/>Bonne journée.<br/>'
              message_html += 'Le service client EIF-Consulting'

              transporter.sendMail({
                from: 'markupconsulting2017@gmail.com',
                to: email,
                subject: 'Activation de votre compte sur le site e-commerce eif-consulting',
                text: message_text,
                html: message_html
            }, (err, info) => {
              if (err){
                console.log("erreur", err)
                res.status(500).json({
                  message:"Erreur d'envoi de mail! Vérifiez votre adresse mail."
                })
              }else{
                console.log(info.envelope);
                console.log(info.messageId);
                res.status(200).json({
                    message:"Veuillez vérifier votre boîte mail pour l'activation de votre compte." 
                })
              }
            });
              
            }
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
    /*app.post('/api/getFrontEndUserTabIdPlans', function(req, res){
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
    })*/
    app.post('/api/savePaymentsFrontEnd', function(req, res){
      const {email, tabIdPlans} = req.body
      //TODO save the email user tabIdPlans
      FrontEndUser.findOne({email}, function(err, user){
        if (err){
          res.status(500).json({
            error:'Erreur interne, essayez encore'
          })
        }else if(!user){
          res.status(401).json({
            error:'Vous n\'êtes pas authorisé'
          })
        }else{
          let tabId = [...user.tabPlansBuyed]
          let addTabPlansBuyed = tabIdPlans.filter(item=>{
            return !tabId.some(itemBuy=>itemBuy._id === item._id)
          })
          user.tabPlansBuyed = [...tabId, ...addTabPlansBuyed]
          user.save(function(err){
            if (err){
              console.log(err)
              res.status(500).json({
                error:'Erreur interne, essayez encore'
              })
            }else{
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
      FrontEndUser.findOne({ email:email }, function(err, user) {
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
              if (!user.isEmailVerified){
                res.status(401).json({
                  error:'Veuillez valider votre compte dans votre boîte mail.'
                })
              }
              else if (user.role === Role.Administrateur && !user.isAdminActive){
                res.status(401).json({
                  error:'Veuillez contacter le service client pour l\'activation de votre compte administrateur.'
                })
              }else{
                const payload = { email:email, role:user.role };
                const token = jwt.sign(payload, secret, {
                  expiresIn: '1h'
                });
                console.log(user.tabPlansBuyed)
                res.cookie('tokenFrontEnd', token, { httpOnly: true })
                  .status(200).json({
                    error:'Connexion correcte',
                    role:user.role,
                    email:user.email,
                    tabIdPlans:user.tabPlansBuyed
                  });
              }
            }
          });
        }
      });
    });
    app.get('/checkTokenFrontEnd', authorize([Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]), function(req, res) {
      FrontEndUser.findOne({email:req.email}, function(err, user){
        if (err || !user){
          res.status(500).json({
            email: '',
            role:'',
            message: 'Erreur d\'authentification.',
            tabIdPlans:[]
          });
          console.log('Erreur de recherche d\'elements, l\'email n\'est pas enregistré')
        }else{
          res.status(200).json({
            email: req.email,
            role:req.role,
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

    if (process.env.NODE_ENV === 'production') {
      // Serve any static files
      
      app.use(express.static(`${__dirname}/client/build`));
    // Handle React routing, return all requests to React app
      app.get('*', function(req, res) {
        res.sendFile(`${__dirname}/client/build/index.html`);
      });
    }
    
    app.listen(port, () => console.log(`Listening on port ${port}`));

  }
});

