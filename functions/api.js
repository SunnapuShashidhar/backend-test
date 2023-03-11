require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("../src//Router/User")
const serverless = require("serverless-http")
const router = express.Router();

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_BD_URL, {
  useNewUrlParser: true,
  useunifiedtopology: true
})
  .then(() => { console.log("mongodb is connected succesfully") })
  .catch((err) => { console.log("error occured" + err) })

app.use(cors({ origin: "https://knowello-front.netlify.app/" }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://knowello-front.netlify.app/')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})


app.use(express.json())
app.use('/public', express.static('public'))

app.use("/api", user);



// const PORT=process.env.PORT
// app.listen(PORT,()=>{
//   console.log(`port is running on ${PORT}`)
// })
// app.use('./',router) 
// module.exports.handler=serverless(app);
app.use('/.netlify/functions/api', router);
module.exports = app;
module.exports.handler = serverless(app);