var express = require("express");
var router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const API = process.env.API_URL;
const algorithm = "aes-256-cbc";
const key = "LM@098765_AVPAppLM@098765_AVPApp";
const iv = "e95a3d73fe601926";
const multer = require("multer");
const upload = multer();
const request = require("request");
var rp = require("request-promise");
var winston = require("../winston");
const { response } = require("express");

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

router.route("/signin").post((req, res) => {
  console.log("inside signin post request");
  var email = req.body.email;
  var pword = String(req.body.password);
  var pass = encrypt(pword);

  var options = {
    method: "POST",
    url: "http://fanwins.in/api/loginPromoter",
    headers: {
      "content-type": "multipart/form-data",
    },
    form: {
      email: email,
      // password: pass,
      password: pword,
    },
    json: true,
  };
  // console.log("inside post login");
  console.log("sign in options: ", options);
  rp(options)
    .then(function (parsedBody) {
      // POST succeeded...
      console.log("parsedBody: ", parsedBody);

      res.json(parsedBody);
    })
    .catch((err) => {
      console.log("error", err);
      if (err.code === "ETIMEDOUT") {
        console.log("err.connect === true", err.connect === true);
        process.exit(0);
      }
      res.send(err);
    });
});

router.route("/forgotpass").post((req, res) => {
  // var data = req.body.emailId;
  console.log("data: ", req.data);

  // var options = {
  //   method: "POST",
  //   uri: "https://avp-backend.com/api/backend/forgotPassword.php",
  //   formData: {
  //     emailId: data,
  //   },
  //   json: true, // Automatically stringifies the body to JSON
  // };

  // rp(options)
  //   .then(function (parsedBody) {
  //     console.log("forgot password fData status: ", parsedBody);
  //     res.send(parsedBody);
  //   })

  //   .catch(function (err) {
  //     console.log("error", err);
  //     res.send(err);
  //     if (err.code === "ETIMEDOUT") {
  //       console.log("err.connect === true", err.connect === true);
  //       process.exit(0);
  //     }
  //   });
});

router.route("/complete-profile").post(upload.single("pic"), (req, res) => {
  console.log("inside post to complete profile");

  var hasAuth = req.cookies.token;
  var data = req.body;
  // console.log("data into complete profile: ", data);
  // console.log('req.files.buffer: ', req.file.buffer)
  console.log("hasAuth: ", hasAuth);

  // var phone = encrypt(data.contact);
  // var pass = encrypt(data.password);
  // var img;
  // if (req.file !== undefined) img = req.file.buffer;
  // // console.log("file in req: ", img);

  // data.jwt = hasAuth;
  // data.contact = phone;
  // data.password = pass;
  // console.log("data1: ", data);
  // data = JSON.parse(JSON.stringify(data));
  // console.log("data2: ", data);
  // if (img) {
  //   data.profilePic = {
  //     value: img,
  //     options: {
  //       filename: req.file.originalname,
  //       contentType: null,
  //     },
  //   };
  // } else {
  //   data.profilePic = "";
  // }
  // console.log("data3: ", data);
  // var options = {
  //   method: "POST",
  //   url: "https://avp-backend.com/api/backend/completeProfile.php",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   formData: data,
  // };

  // // console.log("options.formData ", options.formData);

  // request(options, (error, response, body) => {
  //   var sCode = response.statusCode;
  //   console.log("statuscode: ", sCode);
  //   var _resData = JSON.parse(body);
  //   console.log("_resData.status: ", _resData.status);

  //   // this makes result == true/false, not cleaned up _resData
  //   let result = sCode == "404" ? (_resData = "undefined") : _resData;
  //   console.log("result: ", result);

  //   if (result.status == "Success") {
  //     console.log("inside success message test");
  //     res.send(result);
  //   } else {
  //     console.log("inside status fail");
  //     res.send(result);
  //   }
  //   if (error) {
  //     res.send(result);
  //     console.error("form post failed:", error);
  //   }
  // });
});

router.route("/dashboard").get((req, res) => {
  var hasAuth = req.cookies.token;
  console.log("inside dashboard route");
  // console.log("req: ", req);
  console.log("token: ", hasAuth);

  var options = {
    method: "POST",
    url: "https://avp-backend.com/api/backend/dashboard.php",
    headers: {
      "content-type": "multipart/form-data",
    },
    formData: {
      jwt: hasAuth,
      flag: "1",
    },
  };

  request(options, (error, response, body) => {
    var sCode = response.statusCode;
    // console.log("response: ", response);
    // console.log("statuscode: ", sCode);

    // console.log("body: ", response.body);
    // console.log("status: ", response.body.status);
    // console.log("data: ", response.data);
    var _resData = response.body ? JSON.parse(body) : null;
    // console.log("_resData.status: ", _resData.status);

    // this makes result == true/false, not cleaned up _resData
    var result = sCode == "404" ? (_resData = "undefined") : _resData;
    console.log("_resData: ", _resData);
    console.log("result: ", result);

    if (result && result.status == "Success") {
      console.log("inside success message test");
      res.send(result);
    } else {
      console.log("inside status fail");
      res.send(result);
    }
    if (error) {
      console.error("form post failed:", error);
      return res.status(444).json({ error: "no data returned." });
    }
  });
});

router.route("/loadRegTeamsPlayerTab").post((req, res) => {
  var hasAuth = req.cookies.token;
  console.log("inside reg teams route");
  console.log("hasAuth", hasAuth);
  var lId = req.body.lId;
  console.log("lId for loadRegPlayerTab Teams: ", lId);
  var options = {
    method: "POST",
    url: "https://avp-backend.com/api/backend/leagueTeamsList.php",
    headers: {
      "content-type": "multipart/form-data",
    },
    formData: { jwt: hasAuth, leagueId: lId },
  };

  request(options, (error, response, body) => {
    var sCode = response.statusCode;
    var _resData = response.body ? JSON.parse(body) : null;
    // console.log("_resData: ", _resData);
    // console.log("error: ", error);
    // console.log("body: ", body);

    // this makes result == true/false, not cleaned up _resData
    var result = sCode == "404" ? (_resData = "undefined") : _resData;
    // console.log("_resData: ", _resData);
    // console.log("result: ", result);

    if (result && result.status == "Success") {
      console.log("inside success message test");
      res.send(result);
    } else {
      console.log("inside status fail");
      res.send(result);
    }
    if (error) {
      console.error("form post failed:", error);
      return res.status(444).json({ error: "no data returned." });
    }
  });
});

router.route("/teams-create").post(upload.single("pic"), (req, res) => {
  var hasAuth = req.cookies.token;
  var data = req.body;
  console.log("data into team create: ", data);

  var img;
  if (req.file !== undefined) img = req.file.buffer;

  data.jwt = hasAuth;
  data = JSON.parse(JSON.stringify(data));
  console.log("data2: ", data);
  if (img) {
    data.leagueTeamIcon = {
      value: img,
      options: {
        filename: req.file.originalname,
        contentType: null,
      },
    };
  } else {
    data.leagueTeamIcon = "";
  }
  var options = {
    method: "POST",
    url: "https://avp-backend.com/api/backend/createLeagueTeam.php",
    headers: {
      "content-type": "multipart/form-data",
    },
    formData: data,
  };

  request(options, (error, response, body) => {
    var sCode = response.statusCode;
    console.log("statuscode: ", sCode);
    var _resData = JSON.parse(body);
    console.log("_resData.status: ", _resData.status);

    // this makes result == true/false, not cleaned up _resData
    let result = sCode == "404" ? (_resData = "undefined") : _resData;
    console.log("result: ", result);

    if (result.status == "Success") {
      console.log("inside success message test");
      res.send(result);
    } else {
      console.log("inside status fail");
      res.send(result);
    }
    if (error) {
      res.send(result);
      console.error("form post failed:", error);
    }
  });
});

router.route("/teams-update").post(upload.single("pic"), (req, res) => {
  var hasAuth = req.cookies.token;
  var data = req.body;
  console.log("data into team update: ", data);

  var img;
  if (req.file !== undefined) img = req.file.buffer;

  data.jwt = hasAuth;
  data = JSON.parse(JSON.stringify(data));
  console.log("data2: ", data);
  if (img) {
    data.leagueTeamIcon = {
      value: img,
      options: {
        filename: req.file.originalname,
        contentType: null,
      },
    };
  } else {
    data.leagueTeamIcon = "";
  }
  var options = {
    method: "POST",
    url: "https://avp-backend.com/api/backend/updateTeam.php",
    headers: {
      "content-type": "multipart/form-data",
    },
    formData: data,
  };

  request(options, (error, response, body) => {
    var sCode = response.statusCode;
    console.log("statuscode: ", sCode);
    var _resData = JSON.parse(body);
    console.log("_resData.status: ", _resData.status);

    // this makes result == true/false, not cleaned up _resData
    let result = sCode == "404" ? (_resData = "undefined") : _resData;
    console.log("result: ", result);

    if (result.status == "Success") {
      console.log("inside success message test");
      res.send(result);
    } else {
      console.log("inside status fail");
      res.send(result);
    }
    if (error) {
      res.send(result);
      console.error("form post failed:", error);
    }
  });
});

router.route("/league-create").post(
  upload.fields([
    {
      name: "pic",
      maxCount: 1,
    },
    {
      name: "rules",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    var hasAuth = req.cookies.token;
    var data = req.body;
    console.log("data into create league: ", data);

    var img;
    if (req.file !== undefined) img = req.file.buffer;

    // var _date = convertDate(data.registrationDeadline);
    // var _start = convertDate(data.startDate);

    data.jwt = hasAuth;
    // data.registrationDeadline = _date;
    // data.startDate = _start;

    data = JSON.parse(JSON.stringify(data));

    console.log("data after parse: ", data);

    var img, rules;
    if (req.files !== undefined) {
      img = req.files.pic;
      console.log("img: ", img);
      rules = req.files.rules;
      console.log("rules: ", rules);
    }

    if (img) {
      console.log("inside pos test for profile pic in post");
      data.leagueIcon = {
        value: img[0].buffer,
        options: {
          filename: img[0].originalname,
          contentType: null,
        },
      };
    } else {
      data.leagueIcon = "";
    }
    console.log("data.leagueIcon: ", data.leagueIcon);

    if (rules) {
      console.log("inside pos test for rules in post");
      data.rulesDoc = {
        value: rules[0].buffer,
        options: {
          filename: rules[0].originalname,
          contentType: null,
        },
      };
    } else {
      data.rulesDoc = "";
    }
    console.log("data.rulesDoc: ", data.rulesDoc);

    var options = {
      method: "POST",
      url: "https://avp-backend.com/api/backend/createLeague.php",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      formData: data,
    };

    console.log("options.formData ", options.formData);

    request(options, (error, response, body) => {
      var sCode = response.statusCode;
      console.log("statuscode: ", sCode);
      var _resData = JSON.parse(body);
      console.log("_resData.status: ", _resData.status);

      // this makes result == true/false, not cleaned up _resData
      let result = sCode == "404" ? (_resData = "undefined") : _resData;
      console.log("result: ", result);

      if (result && result.status == "Success") {
        console.log("inside success message test");
        res.send(result);
      } else {
        console.log("inside status fail");
        res.send(result);
      }
      if (error) {
        console.error("form post failed:", error);
        return res.status(444).json({ error: "no data returned." });
      }
    });
  }
);

module.exports = router;
