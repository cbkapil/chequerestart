import FirmData from "../models/Firm/FirmModel.js";
import UserData from "../models/UserData.js";
import express from "express";
import auth from "./Auth.js";
import UserBranch from "../models/UserBranch.js";
import { trusted } from "mongoose";
const router = express.Router();

router.post("/BankLink", auth, async (req, res) => {
  console.log(req.userId);
  var {
   firmid ,
   firmnamee,
    formValues
  } = req?.body;


  console.log("firmname",firmnamee);
  console.log("firmid",firmid);
  console.log("formValuessssssssssssssssssssssssssssssssssssssssssssssss",formValues);

var  firmid2=firmid
    try {

      var userPromises = formValues.map(user => {
        return new Promise((resolve, reject) => {
          var dataa = new UserBranch({
            userid: req?.userId,
            firmname: firmnamee,
            firmid: firmid,
            bank: user.bankname,
            branch: user.branch,
            ifsc: user.ifsc,
            account: user.accountno,
          });
          // console.log("banknamesssssssssssssssssssss", dataa.bankname);
          
          dataa.save((error, result1) => {
            if (error) {
              reject(error)
            }
            
            else{
            resolve(result1)
          console.log('kkkkkk',result1)
         FirmData.findByIdAndUpdate(
                      firmid2,
                      { $push: { bankLink: result1._id } },
                      function (err, result) {
                        if (err) {reject()
                        return}
                        else{
                        
                          resolve(result)}
                        
                          
                         
                        }
                    )};
                    
          })
        })
      });
      res.json({status:true})
      
     
      
    } 
    
    catch (error) {}

   
   
});

export default router;