const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");
// const { default: Contact } = require("../../client/src/components/Contact");

router.get("/", (req, res) => {
  res.send("Hello world from the server router.js");
});

//using promice
// router.post('/register', (req, res)=>{

//     const { name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//       return res.status(422).json({ error : "Plzz filled the filed properly"});
//     }

//     // console.log(req.body);
//     // console.log(req.body.name);//show the name and email
//     // console.log(name);
//     // console.log(email);
//     // console.log(req.body.email);
//     // res.json({message:req.body})
//     // res.send("page is running")

//     User.findOne({ email : email })
//     .then((userExist)=>{
//       if(userExist){
//         return res.status(422).json({ error : "Email Already Exits"});
//       }

//       const user = new User({ name, email, phone, work, password, cpassword})

//       user.save().then(() => {
//         res.status(201).json({message:"User registred sucessfully"});
//       }).catch((err) => res.status(500).json({error:"Failed to registred"}));
//     }).catch(err => { console.log(err);});

//   })

// using async and await process

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plzz filled the filled properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exits" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User registred sucessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plzzz Filled the data" });
    }
    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //need to generate the token and stored cokkie after the password match
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invaild Credientails" });
      } else {
        res.json({ message: "User Signin sucessfully" });
      }
    } else {
      res.status(400).json({ error: "Invaild Credientails" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about page for authentication
router.get("/about", authenticate, (req, res) => {
  console.log("about page");
  res.json(req.rootUser);
});

//get user data for contact us and homepage
router.get("/getdata", authenticate, (req, res) => {
  console.log("hello from contact");
  res.send(req.rootUser);
});

// Contact us page to get info
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "please fill the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
    

      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      )

      await userContact.save();
      res.status(201).json({ message: "user Contact Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout page
router.get("/logout", (req, res) => {
  console.log("logout page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
