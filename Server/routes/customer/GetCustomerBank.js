





import partyData from "../../models/PartyModel.js";
import express from "express";
import auth from "../Auth.js";
const router = express.Router();

router.post("/getcustomerbank", auth  ,async (req, res) => {
    try {
        const result=   partyData.findById(req.body.customerid)
        .select({ "customerbank": { "$slice": -1 }})
       .exec(function(err,doc) {
           if(err){
               console.log(err)
           }
           else{
               res.send(doc)
           }
       })
         } catch (error) {
           console.log(error)
         }
});

export default router;
