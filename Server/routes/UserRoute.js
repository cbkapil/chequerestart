import UserData from "../models/UserData.js";
import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../routes/Auth.js";
import  Token  from "../models/Token.js";
import crypto from "crypto"
import  sendEmail from "../SendEmail.js";

router.post("/register", async (req, res) => {
  const val = Math.floor(1000 + Math.random() * 9000);
  const { username, email, password, mobile } = req.body;
  console.log(username);

  const userExist = await UserData.findOne({ email: email });
  if (userExist) {
    res.status(500).json({ message: "User already exists", status: false });
  }

  try {
    const data = new UserData({
      username,
      email,
      password,
      mobile,
    });

    const dataRegister = await data.save();
    console.log("me hu result",dataRegister)
    if (!dataRegister.verified) {
			let token = await Token.findOne({ userId: dataRegister._id });
			if (!token) {
        
				token = await new Token({
					userId: dataRegister._id,
					token: val,
				}).save();
				
				await sendEmail(dataRegister.email, "E-mail Verification", val);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" , status:true ,data:dataRegister, token:token});
		}
   
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", function (req, res, next) {
  var username = req.body.username;

  UserData.find({ username: username })
    .exec()
    .then((user) => {
      console.log(user);
      if (user.length < 1) {
        res.status(404).json({
          message: "Auth Failed",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (err) {
              res.json({
                message: "Auth Failed",
              });
            }
            if (result) {
              var token = jwt.sign(
                {
                  username: user[0].username,
                  id: user[0]._id,
                },
                "secret",
                {
                  expiresIn: "8h",
                }
              );
              return res.status(200).json({
                message: "User Found",
                token: token,
                username: username,
                // id : id,
                status: true,
              });
            } else {
              res.json({
                message: "Auth Failed",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

router.post("/verify", async (req, res) => {
  console.log("iddddd", req.body.id);
  console.log("iddddd", req.body.passcode);
	try {
    var data=""
		const user = await UserData.findOne({ _id: req.body.id});
    console.log(user)
		if (!user) { return res.status(400).send({ message: "Invalid link" });

  }
     
		const token = await Token.findOne({
			userId: req.body.id,
			token: req.body.passcode,
		});
    console.log("tokennn",token);
		if (!token) return res.status(400).send({ message: "Invalid link" });

		    data =await UserData.findByIdAndUpdate({_id:req.body.id}, { $set: {                // <-- set stage
      verified:true
     } })
		await token.remove();
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
		res.status(200).send({ message: "Email verified successfully",status:true ,data:data});
    console.log("hxxxxxxxxxxxxxxxxxxxxxxxx")
	} catch (error) {
    console.log("errrrtrr",error);
		res.status(500).send({error: error ,message: "Internal Server Error"});
	}
});

export default router;
