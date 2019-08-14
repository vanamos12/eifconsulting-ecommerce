const mongoose = require('mongoose');
const Plan = require('./models/Plan');
const FrontEndUser = require('./models/FrontEndUser')
const BackEndUser = require('./models/BackEndUser')
const Sold = require('./models/Sold')

let mongo_uri = ''

mongo_uri = 'mongodb+srv://pokatchoneng:rolande12@cluster0-dq3vz.mongodb.net/test?retryWrites=true&w=majority'

//mongo_uri = 'mongodb://localhost/react-auth';



mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
    /*Sold.find({}, (err, solds)=>{
        if (err){
            console.log("erreur de recherche de plans", err)
        }else{
            solds.forEach(item=>{
                console.log("Submitter", item.emailSubmitter)
                console.log("Buyer", item.emailBuyer)
                console.log("idPlan", item.idPlan)
            })
        }
    })*/
    FrontEndUser.deleteMany({email:"pokatchoneng@gmail.com"}, (err, deleted)=>{
        if (err){
            console.log("Error of suppression front user", err)
        }else{
            console.log("suppresion completed front user", deleted)
        }
    })

    /*
    BackEndUser.deleteMany({}, (err, deleted)=>{
        if (err){
            console.log("Error of suppression", err)
        }else{
            console.log("suppresion completed", deleted)
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
        type:'Distribution',
        isValidated:true,
        vueMasseFile:'images/coupcoeurs/carrelet-140_140.webp',
        vueAerienneFile:'images/coupcoeurs/carrelet-140_140.webp',
        vueFaceFile:'images/coupcoeurs/carrelet-140_140.webp',
        grosOeuvreFile:'',
        secondOeuvreFile:'',
        charpenteToitureFile:'',
        emailSubmitter:'pokatchoneng@yahoo.fr'
        
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
        type:'3D',
        isValidated:true,
        vueMasseFile:'images/coupcoeurs/dompierre-163_163.webp',
        vueAerienneFile:'images/coupcoeurs/dompierre-163_163.webp',
        vueFaceFile:'images/coupcoeurs/dompierre-163_163.webp',
        grosOeuvreFile:'',
        secondOeuvreFile:'',
        charpenteToitureFile:'',
        emailSubmitter:'pokatchoneng@yahoo.fr'
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
        type:'3D',
        isValidated:true,
        vueMasseFile:'images/coupcoeurs/marine-115_150.webp',
        vueAerienneFile:'images/coupcoeurs/marine-115_150.webp',
        vueFaceFile:'images/coupcoeurs/marine-115_150.webp',
        grosOeuvreFile:'',
        secondOeuvreFile:'',
        charpenteToitureFile:'',
        emailSubmitter:'pokatchoneng@yahoo.fr'
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
        type:'Devis',
        isValidated:true,
        vueMasseFile:'',
        vueAerienneFile:'',
        vueFaceFile:'',
        grosOeuvreFile:'images/coupcoeurs/lagune-117_117.webp',
        secondOeuvreFile:'images/coupcoeurs/lagune-117_117.webp',
        charpenteToitureFile:'images/coupcoeurs/lagune-117_117.webp',
        emailSubmitter:'braintosoft@hotmail.ca'
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
        type:'Devis',
        isValidated:true,
        vueMasseFile:'',
        vueAerienneFile:'',
        vueFaceFile:'',
        grosOeuvreFile:'images/coupcoeurs/mathes-120_150.webp',
        secondOeuvreFile:'images/coupcoeurs/mathes-120_150.webp',
        charpenteToitureFile:'images/coupcoeurs/mathes-120_150.webp',
        emailSubmitter:'braintosoft@hotmail.ca'
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
        type:'Devis',
        isValidated:true,
        vueMasseFile:'',
        vueAerienneFile:'',
        vueFaceFile:'',
        grosOeuvreFile:'images/coupcoeurs/meschers-129_145.webp',
        secondOeuvreFile:'images/coupcoeurs/meschers-129_145.webp',
        charpenteToitureFile:'images/coupcoeurs/meschers-129_145.webp',
        emailSubmitter:'braintosoft@hotmail.ca'
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
        type:'Devis',
        isValidated:true,
        vueMasseFile:'',
        vueAerienneFile:'',
        vueFaceFile:'',
        grosOeuvreFile:'images/coupcoeurs/palmyre-150_180.webp',
        secondOeuvreFile:'images/coupcoeurs/palmyre-150_180.webp',
        charpenteToitureFile:'images/coupcoeurs/palmyre-150_180.webp',
        emailSubmitter:'braintosoft@hotmail.ca'
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
        type:'Distribution',
        isValidated:true,
        vueMasseFile:'images/coupcoeurs/pinede-191_191.webp',
        vueAerienneFile:'images/coupcoeurs/pinede-191_191.webp',
        vueFaceFile:'images/coupcoeurs/pinede-191_191.webp',
        grosOeuvreFile:'',
        secondOeuvreFile:'',
        charpenteToitureFile:'',
        emailSubmitter:'pokatchoneng@yahoo.fr'
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
        type:'Distribution',
        isValidated:true,
        vueMasseFile:'images/coupcoeurs/saint-palais-130_145.webp',
        vueAerienneFile:'images/coupcoeurs/saint-palais-130_145.webp',
        vueFaceFile:'images/coupcoeurs/saint-palais-130_145.webp',
        grosOeuvreFile:'',
        secondOeuvreFile:'',
        charpenteToitureFile:'',
        emailSubmitter:'pokatchoneng@yahoo.fr'
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
        type:'3D',
        isValidated:true,
        vueMasseFile:'images/coupcoeurs/vaux-130_150.webp',
        vueAerienneFile:'images/coupcoeurs/vaux-130_150.webp',
        vueFaceFile:'images/coupcoeurs/vaux-130_150.webp',
        grosOeuvreFile:'',
        secondOeuvreFile:'',
        charpenteToitureFile:'',
        emailSubmitter:'pokatchoneng@yahoo.fr'
    })
    plan10.save(function (err){
        if (err) {
            console.log(err)
        }else{
            console.log('Plan10 Vaux created')
        }
    })
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
        tabPlansBuyed:[],
        tabPlansValidated:[],
        tabPlansNotValidated:[],
        tabPlansSold:[]
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
        tabPlansBuyed:[],
        tabPlansValidated:[],
        tabPlansNotValidated:[plan7, plan6, plan5, plan4],
        tabPlansSold:[]
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
        tabPlansBuyed:[],
        tabPlansValidated:[],
        tabPlansNotValidated:[plan10, plan9, plan8, plan3, plan2, plan1],
        tabPlansSold:[]
    })

    userUtilisateur.save(err=>{
        if (err){
            console.log(err);
        }else{
            console.log("Utilisteur utilisateur crée")
        }
    })*/
    
  }
});