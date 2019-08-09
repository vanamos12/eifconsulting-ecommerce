// PrecommandPlan.js
const mongoose = require('mongoose');

const SoldSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  emailSubmitter:{type:String, required:true},
  emailBuyer:{type:String, required:true},
  plan: {type:Object, required:true},
  idPlan:{type:String, required:true},
  isBuyed:{type:Boolean, required:true}
});

module.exports = mongoose.model('Sold', SoldSchema);