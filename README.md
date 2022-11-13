# campus-bank-full-stack-project
it is a local bank which helps for students inside campus to do transaction using thier admission numbers.


first install some node modules which are required using the commands 
npm i express localStorage mongoose body-parser ejs


const express = require("express");
const localStorage = require('localStorage');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');



mongoose.connect("mongodb://localhost:27017/test");
const app = express();
var nameg, admnog, usernameg, dobg, passwordg, doornog, nearpostg, towng, cityg, pincodeg, loginusr, loginpswd, abcd, balan, uss, admnum_frnd, money_frnd, new_money, money_acc, acch_name, acch_admno;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(express.urlencoded({
  extended: false

}));
