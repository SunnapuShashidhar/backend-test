//node package folders
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
const passwordValidator=require('password-validator')
//module
var userSchema = require("../Module/User")
//uploading image

//user signup
const SignUp = async (req, res) => {

  const { email } = req.body;

  const user = await userSchema.findOne({ email: email })
  if (user) {
    return res.send({ status: 400, message: "user already exsist...!",isSuccessful:false })
  }

  const { name, password } = req.body;
//--------password validation
  var Schema=new passwordValidator();
  Schema.is().min(8).is().max(100).has().uppercase().has().lowercase();
  if(!Schema.validate(password)){
    return res.send({ status: 400, message: "password Should be strong..!",isSuccessful:false });
  }

  const profile=(req.file)?req.file.filename+"-"+Date.now():null;

  const hash_password = await bcrypt.hash(password, 10)
  const newUser = new userSchema({
    name,
    email,
    password: hash_password,
    profile
  });
new Promise((resolve,reject)=>{
  newUser.save((err,respoce)=>{
    if(err)
    return res.send({status:400,message:"error occured"+err,isSuccessful:false});
    return res.send({status:200,respoce,isSuccessful:true})
  })
}).then(res=>{return res})
.catch(err=>{
  throw new Error(err)
})

  
}

//user signin
const SignIn = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.send({status:400,message:"Invalid exisist..!",isSuccessful:false});
  }
  const pswrd = await bcrypt.compare(password, user.password);

  if (pswrd) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRCT_CODE, { expiresIn: "1d" })
    res.send({ status: 200, token, user,isSuccessful:true })
  }
  else {
    return res.send({ status: 400, message: "Invalid Password...!",isSuccessful:false })
  }
}

module.exports = { SignIn, SignUp }