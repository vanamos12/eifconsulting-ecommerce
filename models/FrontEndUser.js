// FrontEndUserUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const FrontEndUserSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:{type:String, required:true},
  surname:{type:String, required:true},
  telephone:{type:Number, required:true},
  role:{
    type:String, 
    enum:['Utilisateur', 'Administrateur', 'SuperAdministrateur'],
    required:true 
  },
  isActive:{
    type:Boolean,
    default:true,
    required:false,
  },
  isAdminActive:{
    type:Boolean,
    default:false,
    required:false
  },
  isEmailVerified:{
    type:Boolean,
    default:false,
    required:false
  },
  emailVerificationToken:{
    type:String,
    trim:true,
    required:false
  },
  passwordResetToken:{
    type:String,
    trim:true,
    required:false
  },
  tabPlansBuyed:{type:Array, required:true},
  tabPlansValidated:{type:Array, default:[], required:false},
  tabPlansNotValidated:{type:Array, default:[], required:false},
  tabPlansSold:{type:Array, default:[], required:false}
});

FrontEndUserSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

FrontEndUserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});
module.exports = mongoose.model('FrontEndUser', FrontEndUserSchema);