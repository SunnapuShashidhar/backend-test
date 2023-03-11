//modules from package.jspon
var express = require("express");
var router = express.Router();
const rateLimit=require("express-rate-limit")
const app=express();
//user defined packages
var { SignIn, SignUp } = require("../Control/auth")//import user defined routes
const { isValidate, SingnInValidation } = require("../Validations/auth")


//uploading image
const multer=require("multer");
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"public/Images")
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname)
  }
})
var upload=multer({storage:storage})


//applimg rate limit
const limit=rateLimit({
  windowMs:60*60*1000,
  max:5
})


//routes
app.use(limit)
router.post('/signin',limit, SingnInValidation, isValidate, SignIn);
router.post("/signup",upload.single('profile'), SignUp);



//exporting
module.exports = router;