// Newletter.js
const mongoose = require('mongoose');

const NewletterSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  
  email: {type:String, required:true, unique:true}
});

module.exports = mongoose.model('Newletter', NewletterSchema);