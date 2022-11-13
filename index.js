//jshint esversion :6

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
const userschema = new mongoose.Schema({
  name: String,
  admno: String,
  dob: {
    type: Date
  },
  username: String,
  password: String,
  doorno: String,
  nearpost: String,
  town: String,
  city: String,
  Pincode: {
    type: Number
  },
  pin: {
    type: Number
  },
  balance: {
    type: Number
  },
  friends: [{
    admission_number: String,
    Name: String,
    _id: false
  }],
  transactions: [{
    to_account: String,
    Amount: {
      type: Number
    }
  }]
});




const User = mongoose.model("user", userschema);

app.post("/", (req, res) => {
  doornog = req.body.doorno;
  nearpostg = req.body.nearpost;
  towng = req.body.mandal;
  cityg = req.body.city;
  pincodeg = req.body.pincode;
  console.log(doornog);
  const x = new User({
    name: nameg,
    admno: admnog,
    dob: dobg,
    username: usernameg,
    password: passwordg,
    doorno: doornog,
    nearpost: nearpostg,
    town: towng,
    city: cityg,
    Pincode: pincodeg,
    pin: 1111,
    balance: 500,
    friends: [],
    transactions: []

  });
  x.save();
  res.redirect("/");
});



app.get("/dashboard", (req, res) => {
  console.log("hi");
  console.log(localStorage.getItem("dusrname"));
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  } else {
    res.render("dashboard", {
      dname: localStorage.getItem("naam"),
      dadmin: localStorage.getItem("adn"),
      ddob: localStorage.getItem("janm"),
      dcity: localStorage.getItem("sthal")
    });
  }
});

app.get("/create_account_1", (req, res) => {
    const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
});

app.get("/create_account_2", (req, res) => {
   const gh = localStorage.getItem("dusrname");
   if (gh == null) {
     res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
});




app.get("/index.html", (req, res) => {
  res.redirect("/");
});




app.get("/create_account.html", (req, res) => {
  //res.send(__dirname);
  res.sendFile(__dirname + "/create_account.html");
});




app.post("/create_account_1", (req, res) => {
  // res.send(__dirname);
  // const x=new User({
  //   username: req.body.User_Name,
  //   password: req.body.Password
  // })
  // x.save();
  nameg = req.body.naam;
  admnog = req.body.admno;
  dobg = req.body.dob;
  res.sendFile(__dirname + "/create_account_1.html");

});





app.post("/create_account_2", async (req, res) => {
  // res.send(__dirname);
  // const y=new User({
  //   name:wer,
  //   username: req.body.usernaam,
  //   password: req.body.passkey,
  //   dob:req.body.dob
  // })
  // y.save();
  // const ue=await User.find({username:req.body.usernaam});
  // if(ue)
  // {
  //   console.log("sorry");
  // }
  usernameg = req.body.usernaam;
  passwordg = req.body.passkey;
  User.findOne({
    username: usernameg
  }, function(err, xy) {
    if (xy == null) {
      if (req.body.passkey === req.body.confirmpasskey) {
        res.sendFile(__dirname + "/create_account_2.html");
      } else {
        res.send("<h1>hello man check be attentive ur key and confirm key doesnt match</h1>");
      }
    } else {
      res.send("<h1>User_Name is taken.</h1>");
    }
  });
});





app.get("/login_page.html", (req, res) => {
  // res.send(__dirname);
  res.sendFile(__dirname + "/login_page.html");
});




app.post("/dashboard", (req, res) => {
  // res.send(__dirname);

  loginusr = req.body.usernm;
  loginpswd = req.body.pswd;
  //console.log(loginpswd);
  User.findOne({
    username: loginusr
  }, function(err, docs) {
    if (docs == null) {
      res.send("<h1>User Doesnt exist</h1>");
    } else {
      if (docs.password != loginpswd) {
        return
        res.send("incorrect password");
      }
      abcd = loginusr;
      console.log(docs);



      localStorage.setItem("naam", docs.name);
      localStorage.setItem("janm", docs.dob);
      localStorage.setItem("sthal", docs.city);
      localStorage.setItem("adn", docs.admno);
      console.log(docs.pin);
      localStorage.setItem("taal", docs.pin);
      localStorage.setItem("dusrname", docs.username);
      localStorage.setItem("pswd1", docs.password);
      localStorage.setItem("balanc", docs.balance);
      localStorage.setItem("donoo", docs.doorno);
          localStorage.setItem("nearpoo", docs.nearpost);
          localStorage.setItem("mandaa", docs.mandal);
          localStorage.setItem("distii", docs.city);
          localStorage.setItem("pincoo", docs.pincode);
      uss = localStorage.getItem("dusrname");

      console.log(docs.balance);
      res.render("dashboard", {
        dname: localStorage.getItem("naam"),
        dadmin: localStorage.getItem("adn"),
        ddob: localStorage.getItem("janm"),
        dcity: localStorage.getItem("sthal")


      });

    }
  });
});




app.post("/logout", (req, res) => {
  localStorage.setItem("naam", null);
  localStorage.setItem("janm", null);
  localStorage.setItem("sthal", null);
  localStorage.setItem("adn", null);
  localStorage.setItem("taal", null);
  localStorage.setItem("dusrname", null);
  localStorage.setItem("password", null);
  localStorage.setItem("pin", null);
  localStorage.removeItem("naam");
  localStorage.removeItem("janm");
  localStorage.removeItem("sthal");
  localStorage.removeItem("adn");
  localStorage.removeItem("taal");
  localStorage.removeItem("dusrname");
  localStorage.removeItem("password");
  localStorage.removeItem("pin");
  res.redirect("/");
});




app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// app.post("/dashboard.html",function(req,res){
//
//   // var s = req.body.usernm;
//   // var t = req.body.pswd;
//   // console.log(req.body.usernm);
//   //
//   // User.find({username:s},function(err){
//   //
//   //     console.log(s);
//   //
//   // })
//
// });

// let x = User.findOne({name:req.body.username});
// localStorage.setItem("user_info",x);
// let y = localStorage.getItem("user");
// User.findOne({name:req.body.username})
// .then((resp)=>{
//   resp.save()
// })
// User.findOne({name:req.body.user_name2})
// .then((resp)=>{
//   resp.balance+=200;
//   resp.save()
//   .then(()=>{
//
//   })
// })




app.get("/viewbalanceotp.html", (req, res) => {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  res.sendFile(__dirname + "/viewbalanceotp.html");
});




app.get("/setuppin1", (req, res) => {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  res.sendFile(__dirname + "/setuppin.html");
});


app.get("/changepassword1", (req, res) => {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  res.sendFile(__dirname + "/changepassword.html");
});




app.post("/change", (req, res) => {
  console.log(req.body.opbhai);
  console.log(localStorage.getItem("pswd1"));
  if (req.body.opbhai == localStorage.getItem("pswd1")) {
    console.log(localStorage.getItem("dusrname"));
    console.log(req.body.newpbhai);
    if (req.body.newpbhai === req.body.cnewpbhai) {
      User.updateOne({
        username: localStorage.getItem("dusrname")
      }, {
        password: req.body.newpbhai
      }, function(err) {
        if (err) {
          console.log(err);
        } else {
          localStorage.setItem("pswd1", req.body.newpbhai);
        }
      });
      // res.render("dashboard",{dname:localStorage.getItem("naam"),dadmin:localStorage.getItem("adn"),ddob:localStorage.getItem("janm"),dcity:localStorage.getItem("sthal")});

      res.redirect("/dashboard");
    } else {
      res.send("Your passwords didn't matched");
    }
  } else {
    res.send("Your password Was incorrect");
  }
  // console.log(User.findOne({username:}));
  // User.updateOne({username:abcd},{pin:req.body.keypin},function(err){
  //   if(err)
  // });
});




app.post("/setuppin", (req, res) => {
  console.log(req.body.oldpin);
  console.log(localStorage.getItem("taal"));
  if (req.body.oldpin == localStorage.getItem("taal")) {
    console.log(localStorage.getItem("dusrname"));
    console.log(req.body.keypin);
    User.updateOne({
      username: localStorage.getItem("dusrname")
    }, {
      pin: req.body.keypin
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        localStorage.setItem("taal", req.body.keypin);
      }
    });
    // res.render("dashboard",{dname:localStorage.getItem("naam"),dadmin:localStorage.getItem("adn"),ddob:localStorage.getItem("janm"),dcity:localStorage.getItem("sthal")});
    res.redirect("/dashboard");
  } else {
    res.send("Your Pin Was incorrect");
  }
  // console.log(User.findOne({username:}));
  // User.updateOne({username:abcd},{pin:req.body.keypin},function(err){
  //   if(err)
  // });
});

app.get("/showbalance", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log("hey");
  localStorage.setItem("balanc", docs[0].balance);
  res.render("showbalance", {
    balan: localStorage.getItem("balanc")
  });
});


app.post("/showbalance", function(req, res) {

  var usr = localStorage.getItem("dusrname");
  var usrpin = req.body.pin_showbal;
  console.log(usr);
  console.log(usrpin);
  User.findOne({
    username: usr
  }, function(err, pq) {
    if (pq === null) {
      res.send("<h1> no such user exist </h1>");
    } else {
      if (pq.pin == usrpin) {
        console.log("success");
        localStorage.setItem("balanc", pq.balance);
        res.render("showbalance", {
          balan: localStorage.getItem("balanc")
        });
        console.log(balan);
      } else {
        console.log("failure");
        console.log(pq.pin);
        console.log(usrpin);
        res.send("<h1> You entered incorrect PIN so please try again </h1>");

      }
    }
  });

});


app.get("/editdetails.html",(req,res)=>{
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  res.sendFile(__dirname+"/editdetails.html");
});



app.post("/updatedetails",(req,res)=>{
  var yu=localStorage.getItem("dusrname");
  console.log(req.body);
  console.log(req.body.dono!="");
  if(req.body.dono!=""){
    console.log("yo1");
  User.updateOne({username:yu},{doorno:req.body.dono},(err)=>{
    if(err){
      console.log(err);
    }
  });
    localStorage.setItem("donoo",req.body.dono);
}
if(req.body.nearpo!=""){

    console.log("yo2");
User.updateOne({username:yu},{nearpost:req.body.nearpo},(err)=>{
  if(err){
    console.log(err);
  }
});
    localStorage.setItem("nearpoo",req.body.nearpo);
}
if(req.body.manda!=""){
User.updateOne({username:yu},{town:req.body.manda},(err)=>{
  if(err){
    console.log(err);
  }
  });
    localStorage.setItem("mandaa",req.body.manda);


}
if(req.body.disti!=""){
User.updateOne({username:yu},{city:req.body.disti},(err,up)=>{
  if(err){
    console.log(err);
  }
  });
    localStorage.setItem("distii",req.body.disti);

}
if(req.body.pinco!=""){
User.updateOne({username:yu},{Pincode:req.body.pinco},(err)=>{
  if(err){
    console.log(err);
  }
});
    localStorage.setItem("pincoo",req.body.pinco);

}
  res.redirect("/dashboard");
});







app.get("/addfriend.html", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log(gh);
  if (gh) {
    res.sendFile(__dirname + "/addfriend.html");
  } else {
    res.send("Login to view this page");
  }

  console.log("waw");
});


app.post("/addfriend.html", function(req, res) {

  console.log("hey");
  console.log(req.body.peru);
  console.log(req.body.admn);

  var veede = req.body.peru;
  var nambaru = req.body.admn;

  var obj = {
    admission_number: nambaru,
    Name: veede
  };

  User.findOne({
    admno: nambaru
  }, function(err, vapas) {
    if (vapas === null) {
      res.send("<h1> No User exsists with the given details </h1>");
    } else {
      console.log(uss);

      User.findOneAndUpdate({
        username: uss
      }, {
        $addToSet: {
          friends: obj
        }
      }, function(err, updtd) {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      res.redirect("/dashboard");
    }
  });
});



app.get("/removefriend.html", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log(gh);
  if (gh) {
    res.sendFile(__dirname + "/removefriend.html");
  } else {
    res.send("Login to view this page");
  }

  console.log("waw");
});


app.post("/removefriend.html", function(req, res) {
  console.log("hey ippudu removal start");
  console.log(req.body.peru);
  console.log(req.body.admn);

  var vide = req.body.rmperu;
  var numbaru = req.body.rmadmn;

  var obju = {
    admission_number: numbaru,
    Name: vide
  };

  User.findOne({
    admno: numbaru
  }, function(err, vapasu) {
    if (vapasu === null) {
      res.send("<h1> No User exsists with the given details </h1>");
    } else {
      console.log(uss);

      User.findOneAndUpdate({
        username: uss
      }, {
        $pull: {
          friends: obju
        }
      }, function(err, updtdu) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully removed");
        }
      });
      res.redirect("/dashboard");
    }
  });
});

app.get("/tofriend.ejs", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log(gh);
  if (gh) {

    User.findOne({
      username: gh
    }, function(err, vps) {
      res.render("tofriend", {
        frnd: vps.friends
});
      console.log(vps.admission_number);
    });

  } else {
    res.send("Login to view this page");
  }

  console.log("waw");

});

app.get("/amount.html", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log(gh);
  if (gh) {
    res.sendFile(__dirname + "/amount.html");
  } else {
    res.send("Login to view this page");
  }
});

app.post("/tofriend.ejs", function(req, res) {
  console.log(req.body.money_tofriend);
  money_frnd = req.body.money_tofriend;
  console.log(Number(money_frnd));
  console.log(Number(localStorage.getItem("balanc")));
  if(Number(money_frnd) > Number(localStorage.getItem("balanc"))){
    res.send("<h1>Insufficient Balance</h1>");
  }
  else{
    res.redirect("/tofriend.ejs");
  }
});

app.post("/pvttf.html", function(req, res) {
  console.log("posted to pvttf");
  admnum_frnd = req.body.sbmt;
  console.log(req.body.sbmt);
  res.redirect("/pvttf.html");
});

app.get("/pvttf.html", function(req, res) {
  console.log("got pvttf");
  res.sendFile(__dirname + "/pvttf.html");
});


app.post("/success.html", function(req, res) {
  console.log("eneterd success page");
  var xp = req.body.pint_tofriend;
  var obj1={
    to_account:admnum_frnd,
    Amount:-money_frnd
  };
  var obj2={
    to_account:localStorage.getItem("adn"),
    Amount:Number(money_frnd)
  };
  console.log(obj1);
  console.log(obj2);





  console.log(typeof(balan));
  User.findOne({
    username: uss
  }, function(err, bss) {
    if (bss === null) {
      console.log("user not found");
    } else {
      var z;
      var q = bss.balance;
      if (uss.pin === xp) {
        User.findOne({
          admno: admnum_frnd
        }, function(err, bek) {
          console.log(admnum_frnd);
          if (bek == null) {
            console.log("pre-error");
            console.log(err);
          } else {
            z = bek.balance;
            Number(z = Number(z) + Number(money_frnd));
            console.log("pre-bek");
            console.log(bek);
          }
        });
        User.findOneAndUpdate({
          username: uss
        }, {




          $set: {
            balance: q - money_frnd
          }
          ,$push: {
            transactions:obj1
          }



        }, function(err, beek) {
          if (beek === null) {
            console.log(err);
          } else {
            console.log("done found the  match");
            console.log(beek);
            User.findOneAndUpdate({
              admno: admnum_frnd
            }, {


              $set: {
                balance: z
              }
              ,$push: {
                transactions:obj2
              }



            }, function(err, aek) {
              if (aek === null) {
                console.log(err);
              } else {
                console.log("done found the match");
                console.log(aek);
              }
            });



            res.redirect("/dashboard");
          }

        });


      }
    }

  });
});


app.get("/amounttoaccount.html", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log("entered amout to account page");
  res.sendFile(__dirname + "/amounttoaccount.html");
});



app.post("/to-account.html", function(req, res) {
  console.log("posted to to-account");
  console.log(req.body.money_toacc);
  money_acc = Number(req.body.money_toacc);
  if(money_acc > localStorage.getItem("balanc")){
    res.send("<h1>Insufficient Balance</h1>");
  }
  else{
    res.redirect("/to-account.html");
  }

});



app.get("/to-account.html", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log("got to-account page");
  res.sendFile(__dirname + "/to-account.html");
});

app.post("/otp.html", function(req, res) {
  console.log("posted to otp page");
  console.log(req.body.Name_acch);
  console.log(req.body.Admno_acch);
  acch_admno = req.body.Admno_acch;
  acch_name = req.body.Name_acch;
  res.redirect("/otp.html");
});

app.get("/otp.html", function(req, res) {
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  console.log("got to otp page");
  res.sendFile(__dirname + "/otp.html");
});

app.post("/successacc.html", function(req, res) {
  console.log("posted to successacc");
  console.log(req.body.pin_toacc);
  var pin_toa = Number(req.body.pin_toacc);
  console.log(acch_admno);
  console.log(acch_name);
  console.log(uss);
  var nwbal;
  var xyp;
  var xyq;
  console.log(acch_admno);
  var obj3={
    to_account:acch_admno,
    Amount:-money_acc
  };
  console.log(obj3);
  var obj4={
    to_account:localStorage.getItem("adn"),
    Amount:Number(money_acc)
  };
  User.findOne({
    username: uss
  }, function(err, usernameret) {
    if (err) {
      console.log(err);
    }
    if (usernameret === null) {
      console.log("no such user is present");
    } else {
      console.log(usernameret.balance);
      var currmoney = usernameret.balance;
      console.log(currmoney);
      console.log(money_acc);
      if (usernameret.pin === pin_toa) {
        console.log("pin matched");
        User.findOne({
          admno: acch_admno
        }, function(err, recfnret) {
          if (err) {
            console.log(err);
          }
          if (recfnret === null) {
            console.log("no user found with that admission number");
          } else {

            console.log(recfnret);
            xyq = recfnret.balance;
            Number(nwbal = Number(xyq + money_acc));
            console.log(nwbal);


            User.findOneAndUpdate({
              admno: acch_admno
            }, {





              $set: {
                balance: nwbal
              }
              ,$push: {
                transactions:obj4
              }



            }, function(err, updret) {
              if (err) {
                console.log(err);
              } else {
                console.log(updret);
              }
            });



            res.redirect("/dashboard");
            //console.log(money_acc);
          }
        });

        console.log(usernameret.username);

        xyp = (currmoney - money_acc);
        console.log(xyp);
        console.log("xyp");
        User.findOneAndUpdate({
          username: uss
        }, {



          $set: {
            balance: xyp
          }
          ,$push: {
            transactions:obj3
          }





        }, function(err, smt) {
          if (err) {
            console.log("pre-err");
            console.log(err);
          } else {
            console.log("pre-smt");
            console.log(smt);
          }
        });


      } else {
        console.log("sorry pin didnt match");
      }
    }
  });
});

app.post("/history",(req,res)=>{
  if(req.body.pin_toacc!==localStorage.getItem("taal"))
  {
    res.send("<h1>Incorrect Pin</h1>");
  }
  User.findOne({
    username: uss
  },function(err,ipop){
     if(err){
       console.log(err);
     }
     else{
       var tye=ipop.transactions;
       res.render("history",{hist:tye});
     }
  });
})


app.post("/hist",(req,res)=>{
  console.log(localStorage.getItem("adn"));
  res.redirect("/dashboard");
})


app.get("/checkpin.html",(req,res)=>
{
  const gh = localStorage.getItem("dusrname");
  if (gh == null) {
    res.redirect("/");
    res.send("<h1>please login to view this page</h1>");
  }
  res.sendFile(__dirname+"/checkpin.html");
});


app.listen(3000, (req, res) => {
  console.log("running on port 3000");
});
