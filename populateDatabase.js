const mongoose = require('mongoose');
const Plan = require('./models/Plan');
const FrontEndUser = require('./models/FrontEndUser')
const BackEndUser = require('./models/BackEndUser')
const Sold = require('./models/Sold')

let mongo_uri = ''
if (process.env.NODE_ENV === 'production') {
    mongo_uri = 'mongodb+srv://pokatchoneng:rolande12@cluster0-dq3vz.mongodb.net/test?retryWrites=true&w=majority'
}else{
    mongo_uri = 'mongodb://localhost/react-auth';
}


mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
    Sold.find({}, (err, solds)=>{
        if (err){
            console.log("erreur de recherche de plans", err)
        }else{
            solds.forEach(item=>{
                console.log("Submitter", item.emailSubmitter)
                console.log("Buyer", item.emailBuyer)
                console.log("idPlan", item.idPlan)
            })
        }
    })
    /*BackEndUser.deleteMany({}, (err, deleted)=>{
        if (err){
            console.log("Error of suppression", err)
        }else{
            console.log("suppresion completed", deleted)
        }
    })
    FrontEndUser.deleteMany({}, (err, deleted)=>{
        if (err){
            console.log("Error of suppression front user", err)
        }else{
            console.log("suppresion completed front user", deleted)
        }
    })
    Plan.deleteMany({}, (err, deleted)=>{
        if (err){
            console.log("Error of suppression plan", err)
        }else{
            console.log("suppresion completed plan", deleted)
        }
    })
    */
    /*
    let userSuperAdministrateur = FrontEndUser({
        _id: new mongoose.Types.ObjectId(),
        email: 'pokatchoneng@live.fr',
        password: 'rolande12',
        name:'Poka',
        surname:'Hermann',
        telephone:'656752739',
        role:'SuperAdministrateur',
        isAdminActive:true,
        isEmailVerified:true,
        tabPlansBuyed:[]
    })

    userSuperAdministrateur.save(err=>{
        if (err){
            console.log(err);
        }else{
            console.log("Utilisteur super administrateur crée")
        }
    })

    let userAdministrateur = FrontEndUser({
        _id: new mongoose.Types.ObjectId(),
        email: 'braintosoft@hotmail.ca',
        password: 'rolande12',
        name:'Poka',
        surname:'Hermann',
        telephone:'656752739',
        role:'Administrateur',
        isAdminActive:true,
        isEmailVerified:true,
        tabPlansBuyed:[]
    })

    userAdministrateur.save(err=>{
        if (err){
            console.log(err);
        }else{
            console.log("Utilisteur administrateur crée")
        }
    })
    
    let userUtilisateur = FrontEndUser({
        _id: new mongoose.Types.ObjectId(),
        email: 'pokatchoneng@yahoo.fr',
        password: 'rolande12',
        name:'Poka',
        surname:'Hermann',
        telephone:'656752739',
        role:'Utilisateur',
        isEmailVerified:true,
        tabPlansBuyed:[]
    })

    userUtilisateur.save(err=>{
        if (err){
            console.log(err);
        }else{
            console.log("Utilisteur utilisateur crée")
        }
    })
    µ/
    /*
    let plan1 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Traditionnelle',
        name: 'Carrelet',
        price: 100000,
        image: 'images/coupcoeurs/carrelet-140_140.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: true,
        isStyleContemporain: true,
        isStyleTraditionnel: true,
        isNiveauPlainPied: true,
        isNiveauAEtages: true,
        isNiveauSousSol: true,
        isChambreTwo: true,
        isChambreThree: true,
        isChambreFourMore:true,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true,
        
    })
    plan1.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan1 created')
        }
    })
    let plan2 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Contemporaine',
        name: 'Dompierre',
        price: 150000,
        image: 'images/coupcoeurs/dompierre-163_163.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: true,
        isStyleContemporain: false,
        isStyleTraditionnel: false,
        isNiveauPlainPied: true,
        isNiveauAEtages: false,
        isNiveauSousSol: false,
        isChambreTwo: true,
        isChambreThree: false,
        isChambreFourMore:false,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan2.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan2 created')
        }
    })

    let plan3 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Contemporaine',
        name: 'Marine',
        price: 150000,
        image: 'images/coupcoeurs/marine-115_150.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: false,
        isStyleContemporain: true,
        isStyleTraditionnel: false,
        isNiveauPlainPied: false,
        isNiveauAEtages: true,
        isNiveauSousSol: false,
        isChambreTwo: false,
        isChambreThree: true,
        isChambreFourMore:false,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan3.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan3 created')
        }
    })

    let plan4 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Architecte',
        name: 'Lagune',
        price: 200000,
        image: 'images/coupcoeurs/lagune-117_117.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: false,
        isStyleContemporain: false,
        isStyleTraditionnel: true,
        isNiveauPlainPied: false,
        isNiveauAEtages: false,
        isNiveauSousSol: true,
        isChambreTwo: false,
        isChambreThree: false,
        isChambreFourMore:true,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan4.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan4 created')
        }
    })

    let plan5 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Architecte',
        name: 'Mathes',
        price: 250000,
        image: 'images/coupcoeurs/mathes-120_150.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: true,
        isStyleContemporain: false,
        isStyleTraditionnel: false,
        isNiveauPlainPied: true,
        isNiveauAEtages: false,
        isNiveauSousSol: false,
        isChambreTwo: true,
        isChambreThree: false,
        isChambreFourMore:false,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan5.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan5 Marine created')
        }
    })

    let plan6 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Architecte',
        name: 'Meschers',
        price: 300000,
        image: 'images/coupcoeurs/meschers-129_145.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: false,
        isStyleContemporain: true,
        isStyleTraditionnel: false,
        isNiveauPlainPied: false,
        isNiveauAEtages: true,
        isNiveauSousSol: false,
        isChambreTwo: false,
        isChambreThree: true,
        isChambreFourMore:false,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan6.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan6 Meschers created')
        }
    })

    let plan7 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Architecte',
        name: 'Palmyre',
        price: 350000,
        image: 'images/coupcoeurs/palmyre-150_180.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: false,
        isStyleContemporain: false,
        isStyleTraditionnel: true,
        isNiveauPlainPied: false,
        isNiveauAEtages: false,
        isNiveauSousSol: true,
        isChambreTwo: false,
        isChambreThree: false,
        isChambreFourMore:true,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan7.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan7 Palmyre created')
        }
    })

    const plan8 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Traditionnelle',
        name: 'Pinède',
        price: 400000,
        image: 'images/coupcoeurs/pinede-191_191.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: true,
        isStyleContemporain: false,
        isStyleTraditionnel: false,
        isNiveauPlainPied: true,
        isNiveauAEtages: false,
        isNiveauSousSol: false,
        isChambreTwo: true,
        isChambreThree: false,
        isChambreFourMore:false,
        isCoupCoeur:true,
        isPopular: false,
        isValidated: true
    })
    plan8.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan8 Pinède created')
        }
    })

    const plan9 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Traditionnelle',
        name: 'Saint Palais',
        price: 450000,
        image: 'images/coupcoeurs/saint-palais-130_145.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: false,
        isStyleContemporain: true,
        isStyleTraditionnel: false,
        isNiveauPlainPied: false,
        isNiveauAEtages: true,
        isNiveauSousSol: false,
        isChambreTwo: false,
        isChambreThree: true,
        isChambreFourMore:false,
        isCoupCoeur:false,
        isPopular: true,
        isValidated: true
    })
    plan9.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan9 Saint Palais created')
        }
    })

    const plan10 = Plan({
        _id: new mongoose.Types.ObjectId(),
        categorie:'Contemporaine',
        name: 'Vaux',
        price: 500000,
        image: 'images/coupcoeurs/vaux-130_150.webp',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        isStyleModerne: false,
        isStyleContemporain: false,
        isStyleTraditionnel: true,
        isNiveauPlainPied: false,
        isNiveauAEtages: false,
        isNiveauSousSol: true,
        isChambreTwo: false,
        isChambreThree: false,
        isChambreFourMore:true,
        isCoupCoeur:false,
        isPopular: true,
        isValidated: true
    })
    plan10.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan10 Vaux created')
        }
    })*/
  }
});