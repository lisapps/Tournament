var express = require("express");
var router = express.Router();
const request = require("request");
var rp = require("request-promise");

// var app = express();

/* GET home page. */
router.get("/", function(err, req, res) {
  // res.render("index");
  next(err);
});

router.route("/dashboard").get((req, res) => {
  var hasAuth =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsidXNlcklkIjoiMiJ9fQ.tNtfHyoUd2o8piY8VkcsgqeRlNRKtVvGsBL4TQbHGDg";
  console.log("inside dashbaord route");
  console.log("token: ", hasAuth);

  var options = {
    method: "POST",
    uri: "https://avp-backend.com/api/backend/dashboard.php",
    headers: {
      "content-type": "multipart/form-data"
    },
    form: {
      jwt: hasAuth,
      flag: "1"
    },
    json: true
  };

  rp(options)
    .then(function(result) {
      // POST succeeded...
      console.log("parsedResult: ", result);
      res.send(result);
    })
    .catch(function(err) {
      console.log("error", err);
      if (err.code === "ETIMEDOUT") {
        console.log(err.connect === true);
        process.exit(0);
      }
    });
});

const testAPIRouter = require("./testAPI");
router.use("/testRoute", testAPIRouter);

module.exports = router;
