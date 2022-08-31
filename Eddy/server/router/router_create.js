const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
let UserAccount = require("../model/model_account.js");
let UserProfile = require("../model/model_profile.js");
let VerifyingAccount = require("../model/model_verifyaccount.js");
const mongoose = require("mongoose");
const cors = require("cors");

router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/registration/:id", (req, res) => {
  id = req.params.id.toString();
  console.log(id);
  if (req.params.id == "undefined") return res.send("update");
  if (!mongoose.Types.ObjectId.isValid(id)) return res.send("wrong");
  VerifyingAccount.exists({_id: id}, function (err, result) {
    if (err) {
      console.log(err);
    }
    else if (result == true) {
      return res.send("create");
    }
    return res.send("wrong");
  });
});

router.post("/registration/:id", async (req, res) => {
  //for user first time profile registration or user updating his information
  var happy = JSON.stringify(req.body);
  var n = happy.indexOf("interest");
  var happy2 = happy.slice(0, n + 8) + happy.slice(n + 10);
  happy = JSON.parse(happy2).interest;

  var salt = "";
  var hash = "";
  //password hashing
  try {
    salt = await bcrypt.genSaltSync(10);
  } catch (err) {
    console.log(err);
  }

  if (req.params.id != "undefined") {
    //first time registration
    const existdUserName = await UserAccount.findOne({ username: req.body.username });
    if (existdUserName) {
      //we only accept unique username
      console.log(existdUserName);
      return res.send("username taken");
    } else {
      VerifyingAccount.findByIdAndRemove({ _id: req.params.id }, async function (err, record) {
        //when user created account, remove him from the verifying account database
        if (err) {
          console.log(err);
        } 
        else if (record == null) {
          console.log("wrong object id");
          return res.send("redirect");
        }
        else {
          console.log(record);
          //insert into UserAccount
          const user_id = new mongoose.Types.ObjectId();
          const profile_id = new mongoose.Types.ObjectId();

          console.log(record.email);
          console.log(record.password);
          try {
            salt = await bcrypt.genSaltSync(10);
          } catch (err) {
            console.log(err);
          }
          try {
            hash = await bcrypt.hashSync(record.password, salt);
          } catch (err) {
            console.log(err);
          }

          var newUserAccount = new UserAccount({
            //create new user
            _id: user_id,
            email: record.email,
            username: req.body.userName,
            password: hash,
            userProfile: profile_id,
            token: 20,
          });

          console.log(req.body.interest);
          var newUserProfile = new UserProfile({
            _id: profile_id,
            account: user_id,
            picture: req.body.profilePic,
            nickName: req.body.nickName,
            gender: req.body.gender,
            university: req.body.university,
            faculty: req.body.faculty,
            major: req.body.major,
            year: req.body.year,
            status: req.body.status,
            description: req.body.desc,
            interest: happy, //array of interests
            createdTime: Date.now(),
            contact: req.body.contact, //ig
          });

          try {
            await newUserAccount.save();
            console.log("user account successfully created");
          } catch (err) {
            console.log("user account can't be created");
            console.log(err);
          }

          try {
            await newUserProfile.save();
            console.log("user profile successfully created");
          } catch (err) {
            console.log("user profile can't be created");
            console.log(err);
          }

          return res.send("Created");
        }
      });
    }
  } else {
    //this is for user modifying his preofile details
    account = await UserAccount.findOne({ username: req.body.userName });
    if (!(req.body.PW == "" || req.body.PW == null || req.body.PW == undefined)) {
      //if he changes password, hash it
      try {
        hash = await bcrypt.hashSync(req.body.PW, salt);
      } catch (err) {
        console.log(err);
      }
      //update user password
      await UserAccount.updateOne({ username: req.body.userName }, { password: hash });
    }

    await UserProfile.updateOne(
      //update user profile info
      { account: account._id },
      {
        picture: req.body.picture,
        nickName: req.body.nickName,
        year: req.body.year,
        gender: req.body.gender,
        description: req.body.desc,
        faculty: req.body.faculty,
        university: req.body.university,
        status: req.body.status,
        interest: happy,
        contact: req.body.contact,
      }
    );
    return res.send("Updated");
  }
});

module.exports = router;
