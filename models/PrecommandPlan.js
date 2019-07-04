// PrecommandPlan.js
const mongoose = require('mongoose');

const PrecommandPlanSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  command:{
    type:String, 
    required:true},
  telephone:{type:String, required:true},
  email:{type:String, required:true},
  total:{type:Number, required:true},
  plans: {type:Array, required:true}
});

module.exports = mongoose.model('PrecommandPlan', PrecommandPlanSchema);