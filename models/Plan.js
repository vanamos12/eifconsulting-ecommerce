// Plan.js
const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  categorie:{
    type:String, 
    enum:['Traditionnelle', 'Contemporaine', 'Architecte'],
    required:true},
  name: {type:String, required:true},
  price: {type:Number, required:true},
  image: {type:String, required:true},
  description:{type:String, required:true},
  isStyleModerne: {type: Boolean, required:true},
  isStyleContemporain: {type: Boolean, required:true},
  isStyleTraditionnel: {type: Boolean, required:true},
  isNiveauPlainPied: {type: Boolean, required:true},
  isNiveauAEtages: {type: Boolean, required: true},
  isNiveauSousSol: {type:Boolean, required:true},
  isChambreTwo: {type: Boolean, required:true},
  isChambreThree: {type: Boolean, required:true},
  isChambreFourMore:{type:Boolean, required:true},
  isCoupCoeur:{type:Boolean, required:true},
  isPopular: {type:Boolean, required:true},
  type:{
    type:String, 
    required:false,
    enum:['Distribution', '3D', 'Devis']
  },
  vueMasseFile:{type:String, required:false},
  vueAerienneFile:{type:String, required:false},
  vueFaceFile:{type:String, required:false},
  grosOeuvreFile:{type:String, required:false},
  secondOeuvreFile:{type:String, required:false},
  charpenteToitureFile:{type:String, required:false},
  emailSubmitter:{type:String, required:false}
});

module.exports = mongoose.model('Plan', PlanSchema);