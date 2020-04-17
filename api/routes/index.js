var express = require("express");
var router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const algorithm = "aes-256-cbc";
const key = "LM@098765_AVPAppLM@098765_AVPApp";
const iv = "e95a3d73fe601926";
const multer = require("multer");
const request = require("request");
var rp = require("request-promise");
var winston = require("winston");
// const axios = require("axios");

// const http = require("http");

/*
    ### encryption function ###
*/

function encrypt(text) {
  let _cipher = crypto.createCipheriv(algorithm, key, iv);
  let _encrypted = _cipher.update(text, "utf8", "base64");
  _encrypted += _cipher.final("base64");
  return _encrypted.toString("base64");
}

function decrypt(text) {
  var _encrypted;
  if (text) _encrypted = Buffer.from(text, "base64");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv)
  );

  decipher.setAutoPadding(true);
  let decrypt = decipher.update(_encrypted, "base64");
  decrypt += decipher.final();
  return decrypt;
}

function convertDate(date) {
  var _date_array = date.split("/");
  var _new_Date = _date_array[2] + "-" + _date_array[0] + "-" + _date_array[1];
  return _new_Date;
}

function revertDate(date) {
  var _date_array = date.split("-");
  var _new_Date = _date_array[1] + "/" + _date_array[2] + "/" + _date_array[0];
  return _new_Date;
}

function convertTime(time) {
  // TODO: have default time set to 0
  var _hours = Number(time.match(/^(\d+)/)[1]);
  var _mins = Number(time.match(/:(\d+)/)[1]);
  var _meridiam;

  if (_hours > 12) {
    _meridiam = "PM";
    _hours = _hours - 12;
  } else {
    _meridiam = "AM";
  }

  var sHours = _hours.toString();
  var sMins = _mins.toString();

  if (_mins < 10) sMins = "0" + sMins;
  return sHours + ":" + sMins + " " + _meridiam;
}

// testAPI.get("/", (req, res) => {
//   res.send({
//     text: "We are getting data from API with React asyc and hooks!"
//   });
// });

router.route("/signin").post((req, res) => {
  console.log("inside signin post request");
  var email = req.body.username;
  var pword = String(req.body.password);
  // var email = "lisa_ziegler@kingston.com";
  // var pword = "123abc456";
  var pass = encrypt(pword);

  console.log("in signin route");
  console.log("email: ", email);
  console.log("pass: ", pass);

  var options = {
    method: "POST",
    url: "https://avp-backend.com/api/backend/login.php",
    headers: {
      "content-type": "multipart/form-data"
    },
    form: {
      emailId: email,
      password: pass
    },
    json: true
  };
  // console.log("inside post login");
  console.log("sign in options: ", options);
  rp(options)
    .then(function(parsedBody) {
      // POST succeeded...
      console.log("parsedBody: ", parsedBody);
      // var complete = parsedBody.completeProfileStatus;
      console.log("parsedBody.status: ", parsedBody.status);

      // if (complete == "1") {
      //   //console.log('inside complete profile')
      //   var tkn = parsedBody.jwt;
      //   var decoded = jwt.verify(tkn, secret);
      //   var userid = decoded.data.userId;

      //   res.cookie("apitkn", tkn, {
      //     maxAge: 86400000,
      //     httpOnly: true,
      //     sameSite: "strict",
      //     secure: false
      //   });

      // } else if (){
      //   res.redirect("signin-error");
      // }

      res.json(parsedBody);
    })
    .catch(err => {
      console.log("error", err);
      if (err.code === "ETIMEDOUT") {
        console.log("err.connect === true", err.connect === true);
        process.exit(0);
      }
    });

  // var body = {
  //   emailId: email,
  //   password: pass
  // };

  // axios({
  //   method: "post",
  //   url: "https://avp-backend.com/api/backend/login.php",
  //   data: body
  // })
  //   // .post("https://avp-backend.com/api/backend/login.php", {
  //   //   emailId: email,
  //   //   password: pass
  //   // })
  //   .then(response => {
  //     console.log("response.status: ", response.status);
  //     var rdata = response.data;
  //     console.log("response data: ", rdata);

  //     res.json(rdata || {});
  //   })
  //   .catch(function(error) {
  //     console.log("inside catch error: ", error);
  //     res.send(error);
  //   });
  // const data = JSON.stringify({
  //   emailId: email,
  //   password: pass
  // });

  // const options = {
  //   // port: 80,
  //   hostname: "avp-backend.com",
  //   path: "/api/backend/login.php",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     "Content-Length": data.length
  //   }
  // };

  // // console.log("options: ", options);

  // const apiReq = https.request(options, response => {
  //   // console.log("response: ", response);
  //   console.log(`statusCode: ${response.statusCode}`);

  //   response.on("data", d => {
  //     //prints response data
  //     process.stdout.write(d);
  //     // res.json(d);
  //   });
  // });

  // apiReq.on("error", error => {
  //   console.log("inside apiReq on error");
  //   console.error("onError:", error);
  // });

  // apiReq.write(data);
  // apiReq.end();
});

module.exports = router;
