var express = require("express");
var router = express.Router();

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

testAPI.get("/", (req, res) => {
  res.send({
    text: "We are getting data from API with React asyc and hooks!"
  });
});

module.exports = router;
